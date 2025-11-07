using backend.Entities;
using backend.Entities.Enum;
using backend.Repositories;
using Microsoft.EntityFrameworkCore;

public class OrderRepository
{
    private readonly AppDbContext _context;

    // Injec DbContext vào repository
    public OrderRepository(AppDbContext context)
    {
        _context = context;
    }

    /**
     * API: POST /api/orders
     * Chỉ thêm vào ChangeTracker.
     */
    public async Task CreateOrderAsync(Order order)
    {
        // Giả định 'order' đã bao gồm danh sách 'OrderFigures'
        await _context.Orders.AddAsync(order);
    }

    /**
     * API: GET /api/orders
     * Lấy lịch sử đơn hàng, có thể lọc theo status.
     */
    public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId, OrderStatusEnum? status)
    {
        var query = _context.Orders
                            .Include(o => o.OrderFigures)    // Join bảng OrderFigure
                            .ThenInclude(of => of.Figure) // Join tiếp bảng Figure
                            .Where(o => o.UserId == userId);

        // Nếu có tham số 'status', thì lọc theo status
        if (status.HasValue)
        {
            query = query.Where(o => o.Status == status.Value);
        }

        // Sắp xếp đơn hàng mới nhất lên đầu
        return await query.OrderByDescending(o => o.CreatedAt).ToListAsync();
    }

    /**
     * API: GET /api/orders/{id}
     * Lấy chi tiết 1 đơn hàng, bao gồm sản phẩm.
     */
    public async Task<Order> GetOrderDetailsAsync(Guid orderId, Guid userId)
    {
        return await _context.Orders
                             .Include(o => o.OrderFigures)    // Join OrderFigure
                             .ThenInclude(of => of.Figure) // Join Figure
                             .Where(o => o.Id == orderId && o.UserId == userId)
                             .FirstOrDefaultAsync();
    }

    /**
     * API: PUT /api/orders/{id}/cancel
     * Chỉ lấy Order, không cần join, để kiểm tra và cập nhật.
     */
    public async Task<Order> GetOrderByIdAsync(Guid orderId, Guid userId)
    {
        return await _context.Orders
                             .FirstOrDefaultAsync(o => o.Id == orderId && o.UserId == userId);
    }
    
    public async Task<IEnumerable<Order>> SearchOrder(string? userEmail, OrderStatusEnum? orderStatus)
    {
        var query = _context.Orders
            .Include(o => o.OrderFigures)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(userEmail))
        {
            var userQuery = _context.Users
                .Where(u => u.Email.Contains(userEmail))
                .Select(u => u.Id);

            query = query.Where(o => userQuery.Contains(o.UserId));
        }

        if (orderStatus.HasValue)
        {
            query = query.Where(o => o.Status == orderStatus.Value);
        }
        
        return await query.OrderByDescending(o => o.CreatedAt).ToListAsync();
    }

    public async Task<Order?> GetOrderById(Guid id)
    {
        return await _context.Orders
            .Include(o => o.OrderFigures)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}