using backend.Entities;
using backend.Entities.Enum;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;
public class OrderRepository (AppDbContext _context)
{
    public async Task CreateOrderAsync(Order order)
    {
        await _context.Orders.AddAsync(order);
    }

    public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(Guid userId, OrderStatusEnum? status)
    {
        var query = _context.Orders
            .Include(o => o.OrderFigures)
            .ThenInclude(of => of.Figure)
            .Where(o => o.UserId == userId);

        if (status.HasValue)
        {
            query = query.Where(o => o.Status == status.Value);
        }

        return await query.OrderByDescending(o => o.CreatedAt).ToListAsync();
    }

    public async Task<Order> GetOrderDetailsAsync(Guid orderId, Guid userId)
    {
        return await _context.Orders
            .Include(o => o.OrderFigures)
            .ThenInclude(of => of.Figure)
            .Where(o => o.Id == orderId && o.UserId == userId)
            .FirstOrDefaultAsync();
    }

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