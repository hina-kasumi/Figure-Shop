using backend.Entities;
using backend.Entities.Enum;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class OrderRepository (AppDbContext context)
{
    public async Task<IEnumerable<Order>> SearchOrder(string? userEmail, OrderStatusEnum? orderStatus)
    {
        var query = context.Orders
            .Include(o => o.OrderFigures)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(userEmail))
        {
            var userQuery = context.Users
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
        return await context.Orders
            .Include(o => o.OrderFigures)
            .FirstOrDefaultAsync(o => o.Id == id);
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }
}