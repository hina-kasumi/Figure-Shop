using backend.Dtos;

namespace backend.Services;

using Dtos.Order;
using Entities;
using backend.Entities.Enum;
using Repositories; // Nơi chứa các Repository

public class OrderService
{
    private readonly OrderRepository _orderRepository;
    private readonly CartRepository _cartRepository;
    private readonly FigureRepository _figureRepository;
    private readonly VoucherRepository _voucherRepository;
    private readonly UserRepository _userRepository;
    private readonly AppDbContext _context; // Dùng cho Unit of Work / Transaction

    public OrderService(
        OrderRepository orderRepository,
        CartRepository cartRepository,
        FigureRepository figureRepository,
        VoucherRepository voucherRepository,
        AppDbContext context)
    {
        _orderRepository = orderRepository;
        _cartRepository = cartRepository;
        _figureRepository = figureRepository;
        _voucherRepository = voucherRepository;
        _context = context;
    }

    #region POST /api/orders (Checkout)

    public async Task<OrderSummary> CreateOrderAsync(Guid userId, CreateOrderRequestDto dto)
    {
        // Bắt đầu một Transaction để đảm bảo tất cả thao tác
        // (Tạo Order, Xóa Cart, Giảm Stock, Giảm Voucher)
        // hoặc thành công, hoặc thất bại cùng nhau.
        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            // 1. Lấy các mục trong giỏ hàng (ShoppingCart) mà người dùng chọn
            // (CartRepository không có 'GetByIds', nên ta lấy tất cả và lọc)
            var allCartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
            var selectedCartItems = allCartItems
                .Where(item => dto.CartItemIds.Contains(item.FigureId))
                .ToList();
            foreach (var item in allCartItems)
            {
                Console.WriteLine($"CartItem: {item.FigureId}");
            }

            if (!selectedCartItems.Any())
            {
                throw new Exception("Không có sản phẩm nào được chọn.");
            }

            var orderFigures = new List<OrderFigure>();
            double subtotal = 0; // Tổng tiền (chưa giảm giá)

            // 2. Xử lý từng sản phẩm (Kiểm tra kho, tính giá, giảm kho)
            foreach (var item in selectedCartItems)
            {
                var figure = item
                    .Figure ?? await _figureRepository.GetByIdAsync(item.FigureId);
                if (figure == null)
                {
                    throw new Exception($"Không tìm thấy sản phẩm {item.FigureId}.");
                }

                // 2a. Kiểm tra tồn kho
                if (figure.Quantity < item.Quantity)
                {
                    throw new Exception($"Sản phẩm '{figure.Name}' không đủ số lượng.");
                }

                // 2b. Tính giá bán (snapshot price) tại thời điểm mua
                double snapshotPrice = CalculateFigurePrice(figure);
                subtotal += snapshotPrice * item.Quantity;

                // 2c. Tạo entity OrderFigure
                orderFigures.Add(new OrderFigure
                {
                    Id = Guid.NewGuid(),
                    OrderId = Guid.Empty, // Sẽ gán sau
                    UserId = userId,
                    FigureId = item.FigureId,
                    Quantity = item.Quantity,
                    Price = snapshotPrice, // Lưu giá bán tại thời điểm mua
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = userId
                });

                // 2d. Giảm số lượng tồn kho
                figure.Quantity -= item.Quantity;
                _figureRepository.Update(figure); // Đánh dấu là đã thay đổi
            }

            // 3. Xử lý Voucher (Nếu có)
            double discountAmount = 0;
            Voucher? voucher = null;
            if (dto.VoucherId.HasValue)
            {
                voucher = await _voucherRepository.GetById(dto.VoucherId.Value);
                // (Bạn cần thêm logic validate voucher ở đây)
                if (voucher == null || !voucher.IsActive || voucher.Quantity <= 0 ||
                    voucher.UsedFrom > DateTime.UtcNow || voucher.UsedTo < DateTime.UtcNow ||
                    voucher.MinPriceCanUse > subtotal)
                {
                    throw new Exception("Voucher không hợp lệ hoặc không thể áp dụng.");
                }

                // Tính toán số tiền được giảm
                discountAmount = (subtotal * voucher.SalePercent) / 100;
                if (voucher.MaxPriceCanDiscount.HasValue && discountAmount > voucher.MaxPriceCanDiscount.Value)
                {
                    discountAmount = voucher.MaxPriceCanDiscount.Value;
                }

                // Giảm số lượng voucher
                voucher.Quantity -= 1;
                _voucherRepository.Update(voucher);
            }

            double finalPrice = subtotal - discountAmount;

            // 4. Tạo Order
            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                VoucherId = dto.VoucherId,
                Status = OrderStatusEnum.Pending, // Trạng thái mặc định
                TotalPrice = subtotal,   // Giá gốc
                PaidPrice = finalPrice,  // Giá đã giảm
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = userId,
                UpdatedAt = DateTime.UtcNow,
                UpdatedBy = userId
            };

            // Gán OrderId cho các OrderFigures
            foreach (var of in orderFigures)
            {
                of.OrderId = order.Id;
            }
            order.OrderFigures = orderFigures;

            // 5. Thêm Order vào Repository
            await _orderRepository.CreateOrderAsync(order);

            // 6. Xóa các mục đã mua khỏi giỏ hàng
            foreach (var item in selectedCartItems)
            {
                _cartRepository.DeleteItem(item);
            }
            
            // 7. Lưu tất cả thay đổi (Order, Figure, Voucher, Cart)
            await _context.SaveChangesAsync();
            
            // 8. Commit Transaction
            await transaction.CommitAsync();

            // 9. Trả về DTO
            // (Chúng ta cần 'figure' trong orderFigures để map DTO,
            // nhưng entity 'order' vừa tạo chưa có, nên ta gán thủ công)
            for (int i = 0; i < order.OrderFigures.Count; i++)
            {
                order.OrderFigures.ElementAt(i).Figure = selectedCartItems[i].Figure;
            }
            
            return MapToOrderDetailDto(order);
        }
        catch (Exception)
        {
            // Nếu có lỗi, rollback tất cả thay đổi
            await transaction.RollbackAsync();
            throw; // Ném lỗi ra để Controller xử lý
        }
    }

    #endregion

    #region GET /api/orders

    public async Task<IEnumerable<OrderSummary>> GetUserOrdersAsync(Guid userId, OrderStatusEnum? status)
    {
        var orders = await _orderRepository.GetOrdersByUserIdAsync(userId, status);

        return orders.Select(order => new OrderSummary
        {
            Id = order.Id,
            Status = order.Status,
            OrderDate = order.CreatedAt,
            TotalPrice = order.PaidPrice, // Hiển thị giá đã trả
            TotalItemCount = order.OrderFigures.Sum(of => of.Quantity),
        });
    }

    #endregion

    #region GET /api/orders/{id}

    public async Task<OrderSummary> GetOrderDetailsAsync(Guid orderId, Guid userId)
    {
        var order = await _orderRepository.GetOrderDetailsAsync(orderId, userId);

        if (order == null)
        {
            throw new Exception("Không tìm thấy đơn hàng.");
        }

        return MapToOrderDetailDto(order);
    }

    #endregion

    #region PUT /api/orders/{id}/cancel

    public async Task<OrderSummary> CancelOrderAsync(Guid orderId, Guid userId)
    {
        // Dùng GetOrderDetailsAsync để lấy cả OrderFigures
        var order = await _orderRepository.GetOrderDetailsAsync(orderId, userId);

        if (order == null)
        {
            throw new Exception("Không tìm thấy đơn hàng.");
        }

        // Logic nghiệp vụ: Chỉ cho hủy khi đang 'Chờ xác nhận'
        if (order.Status != OrderStatusEnum.Pending)
        {
            throw new Exception($"Không thể hủy đơn hàng ở trạng thái '{order.Status}'.");
        }

        // 1. Cập nhật trạng thái Order
        order.Status = OrderStatusEnum.Cancelled;
        order.UpdatedAt = DateTime.UtcNow;
        order.UpdatedBy = userId;
        _context.Orders.Update(order); // Đánh dấu Order là đã thay đổi

        // 2. Hoàn trả lại số lượng tồn kho
        foreach (var item in order.OrderFigures)
        {
            // (GetOrderDetailsAsync đã include Figure, nhưng có thể nó
            // không được EF theo dõi, nên an toàn nhất là lấy lại)
            var figure = await _figureRepository.GetByIdAsync(item.FigureId);
            if (figure != null)
            {
                figure.Quantity += item.Quantity;
                _figureRepository.Update(figure);
            }
        }
        
        // 3. (Tùy chọn) Hoàn trả lại voucher. 
        // Logic này phức tạp (kiểm tra xem voucher có bị xóa không, v.v.)
        // Tạm thời bỏ qua, nhưng nếu cần thì làm ở đây.
        // if(order.VoucherId.HasValue) { ... }
        
        // 4. Lưu tất cả thay đổi (Order, Figures)
        await _context.SaveChangesAsync();

        // 5. Trả về DTO đã cập nhật
        return MapToOrderDetailDto(order);
    }

    #endregion

    #region Private Helper Methods

    /**
     * Tính giá bán của Figure (có kiểm tra sale)
     */
    private double CalculateFigurePrice(Figure figure)
    {
        bool isSaleActive = figure.SalePercent > 0 &&
                            figure.SaleFrom.HasValue &&
                            figure.SaleTo.HasValue &&
                            figure.SaleFrom.Value <= DateTime.UtcNow &&
                            figure.SaleTo.Value >= DateTime.UtcNow;

        if (isSaleActive)
        {
            return figure.Price * (1 - (figure.SalePercent / 100));
        }

        return figure.Price;
    }
    
    public async Task<IEnumerable<OrderSummary>> SearchOrder(SearchOrderRequest request)
    {
        OrderStatusEnum? statusEnum = null;

        if (!string.IsNullOrWhiteSpace(request.OrderStatus))
        {
            if (Enum.TryParse<OrderStatusEnum>(request.OrderStatus, true, out var parsedStatus))
            {
                statusEnum = parsedStatus;
            }
        }

        var orders = await _orderRepository.SearchOrder(request.UserEmail, statusEnum);

        var userIds = orders.Select(o => o.UserId).Distinct().ToList();
        
        var users = await _userRepository.GetUsersByIds(userIds);
        
        var userDictionary = users.ToDictionary(u => u.Id);

        var dtos = orders.Select(o =>
        {
            userDictionary.TryGetValue(o.UserId, out var user);
            return new OrderSummary
            {
                Id = o.Id,
                TotalPrice = o.TotalPrice,
                PaidPrice = o.PaidPrice,
                PhoneNumber = o.PhoneNumber,
                Address = o.Address,
                Status = o.Status,
                OrderDate = o.CreatedAt,
                DeliveryDate = o.UpdatedAt,
                User = user == null ? null : new UserSummary
                    {
                        Id = user.Id,
                        Email = user.Email
                    },
                OrderFigures = o.OrderFigures.Select(of => new OrderFigureSummary
                {
                    OrderId = of.OrderId,
                    FigureId = of.FigureId,
                    Quantity = of.Quantity,
                    Price = of.Price
                }).ToList()
            };
        });

        return dtos;
    }

    public async Task<bool> UpdateOrderStatus(Guid orderId, OrderStatusEnum newStatus)
    {
        var order = await _orderRepository.GetOrderById(orderId);
        if (order == null)
        {
            return false;
        }
        
        order.Status = newStatus;
        await _orderRepository.SaveChangesAsync();
        return true;
    }
    /**
     * Ánh xạ từ Entity 'Order' sang 'OrderDetailDto'
     */
    private OrderSummary MapToOrderDetailDto(Order order)
    {
        return new OrderSummary
        {
            Id = order.Id,
            Status = order.Status,
            OrderDate = order.CreatedAt,
            Address = order.Address,
            PhoneNumber = order.PhoneNumber,
            
            // Map danh sách sản phẩm
            OrderFigures = order.OrderFigures.Select(of => new OrderFigureSummary()
            {
                OrderId = of.OrderId,
                FigureId = of.FigureId,
                Name = of.Figure?.Name ?? "N/A",
                Quantity = of.Quantity,
                Price = of.Price // Lấy giá đã lưu trong OrderFigure
            }).ToList(),

            // Thông tin tài chính
            Subtotal = order.TotalPrice, // Giá gốc
            DiscountAmount = order.TotalPrice - order.PaidPrice, // Tiền giảm
            TotalPrice = order.PaidPrice // Giá cuối cùng
        };
    }

    #endregion
}