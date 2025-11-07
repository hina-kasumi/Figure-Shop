using backend.Dtos;

namespace backend.Services;

using Dtos.Order;
using Entities;
using backend.Entities.Enum;
using Repositories; 

public class OrderService
{
    private readonly OrderRepository _orderRepository;
    private readonly CartRepository _cartRepository;
    private readonly FigureRepository _figureRepository;
    private readonly VoucherRepository _voucherRepository;
    private readonly UserRepository _userRepository;
    private readonly AppDbContext _context;

    public OrderService(
        OrderRepository orderRepository,
        CartRepository cartRepository,
        FigureRepository figureRepository,
        VoucherRepository voucherRepository,
        UserRepository userRepository,
        AppDbContext context)
    {
        _orderRepository = orderRepository;
        _cartRepository = cartRepository;
        _figureRepository = figureRepository;
        _voucherRepository = voucherRepository;
        _userRepository = userRepository;
        _context = context;
    }

    #region POST /api/orders (Checkout)

    public async Task<OrderSummary> CreateOrderAsync(Guid userId, CreateOrderRequestDto dto)
    {
        await using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
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
            double subtotal = 0;

            foreach (var item in selectedCartItems)
            {
                var figure = item
                    .Figure ?? await _figureRepository.GetByIdAsync(item.FigureId);
                if (figure == null)
                {
                    throw new Exception($"Không tìm thấy sản phẩm {item.FigureId}.");
                }

                if (figure.Quantity < item.Quantity)
                {
                    throw new Exception($"Sản phẩm '{figure.Name}' không đủ số lượng.");
                }

                double snapshotPrice = CalculateFigurePrice(figure);
                subtotal += snapshotPrice * item.Quantity;

                orderFigures.Add(new OrderFigure
                {
                    Id = Guid.NewGuid(),
                    OrderId = Guid.Empty,
                    UserId = userId,
                    FigureId = item.FigureId,
                    Quantity = item.Quantity,
                    Price = snapshotPrice,
                    CreatedAt = DateTime.UtcNow,
                    CreatedBy = userId
                });

                figure.Quantity -= item.Quantity;
                _figureRepository.Update(figure);
            }

            double discountAmount = 0;
            Voucher? voucher = null;
            if (dto.VoucherId.HasValue)
            {
                voucher = await _voucherRepository.GetById(dto.VoucherId.Value);
                if (voucher == null || !voucher.IsActive || voucher.Quantity <= 0 ||
                    voucher.UsedFrom > DateTime.UtcNow || voucher.UsedTo < DateTime.UtcNow ||
                    voucher.MinPriceCanUse > subtotal)
                {
                    throw new Exception("Voucher không hợp lệ hoặc không thể áp dụng.");
                }

                discountAmount = (subtotal * voucher.SalePercent) / 100;
                if (voucher.MaxPriceCanDiscount.HasValue && discountAmount > voucher.MaxPriceCanDiscount.Value)
                {
                    discountAmount = voucher.MaxPriceCanDiscount.Value;
                }

                voucher.Quantity -= 1;
                _voucherRepository.Update(voucher);
            }

            double finalPrice = subtotal - discountAmount;

            var order = new Order
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                VoucherId = dto.VoucherId,
                Status = OrderStatusEnum.Pending,
                TotalPrice = subtotal,
                PaidPrice = finalPrice,
                PhoneNumber = dto.PhoneNumber,
                Address = dto.Address,
                CreatedAt = DateTime.UtcNow,
                CreatedBy = userId,
                UpdatedAt = DateTime.UtcNow,
                UpdatedBy = userId
            };

            foreach (var of in orderFigures)
            {
                of.OrderId = order.Id;
            }
            order.OrderFigures = orderFigures;

            await _orderRepository.CreateOrderAsync(order);

            foreach (var item in selectedCartItems)
            {
                _cartRepository.DeleteItem(item);
            }
            
            await _context.SaveChangesAsync();
            
            await transaction.CommitAsync();

            for (int i = 0; i < order.OrderFigures.Count; i++)
            {
                order.OrderFigures.ElementAt(i).Figure = selectedCartItems[i].Figure;
            }
            
            return MapToOrderDetailDto(order);
        }
        catch (Exception)
        {
            await transaction.RollbackAsync();
            throw;
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
            TotalPrice = order.PaidPrice,
            TotalItemCount = order.OrderFigures.Sum(of => of.Quantity),
            OrderFigures = order.OrderFigures.Select(of => new OrderFigureSummary
            {
                OrderId = of.OrderId,
                FigureId = of.FigureId,
                Name = of.Figure?.Name ?? "N/A",
                Quantity = of.Quantity,
                Price = of.Price
            }).ToList()
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
        var order = await _orderRepository.GetOrderDetailsAsync(orderId, userId);

        if (order == null)
        {
            throw new Exception("Không tìm thấy đơn hàng.");
        }

        if (order.Status != OrderStatusEnum.Pending)
        {
            throw new Exception($"Không thể hủy đơn hàng ở trạng thái '{order.Status}'.");
        }

        order.Status = OrderStatusEnum.Cancelled;
        order.UpdatedAt = DateTime.UtcNow;
        order.UpdatedBy = userId;
        _context.Orders.Update(order);

        foreach (var item in order.OrderFigures)
        {
            var figure = await _figureRepository.GetByIdAsync(item.FigureId);
            if (figure != null)
            {
                figure.Quantity += item.Quantity;
                _figureRepository.Update(figure);
            }
        }
        
        await _context.SaveChangesAsync();

        return MapToOrderDetailDto(order);
    }

    #endregion

    #region Private Helper Methods
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
    
    private OrderSummary MapToOrderDetailDto(Order order)
    {
        return new OrderSummary
        {
            Id = order.Id,
            Status = order.Status,
            OrderDate = order.CreatedAt,
            Address = order.Address,
            PhoneNumber = order.PhoneNumber,
            
            OrderFigures = order.OrderFigures.Select(of => new OrderFigureSummary()
            {
                OrderId = of.OrderId,
                FigureId = of.FigureId,
                Name = of.Figure?.Name ?? "N/A",
                Quantity = of.Quantity,
                Price = of.Price
            }).ToList(),

            Subtotal = order.TotalPrice,
            DiscountAmount = order.TotalPrice - order.PaidPrice,
            TotalPrice = order.PaidPrice
        };
    }

    #endregion
    
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
          if(users.Count() == 0) Console.WriteLine("No users found.");
          
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
                  User = new UserSummary
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
}