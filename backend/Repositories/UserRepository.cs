using backend.Dtos;
using backend.Entities;
using backend.Entities.Enum;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class UserRepository(AppDbContext context)
{
    public async Task<User?> GetUserByEmail(string email)
    {
        return await context.Users
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<User> CreateUser(string email, string password, string status, Role[]  roles)
    {
        
        var existingUser = await GetUserByEmail(email);
        if (existingUser != null)
            throw new Exception("User with same email already exists");
        
        var hashedPass = BCrypt.Net.BCrypt.HashPassword(password);

        if (!Enum.TryParse<StatusEnum>(status, out var statusEnum))
        {
            throw new Exception("Invalid status");
        }

        var user = new User()
        {
            Email = email,
            Password = hashedPass,
            Roles = roles,
            Status = statusEnum
        };
        context.Users.Add(user);
        
        await context.SaveChangesAsync();
        return user;
    }
    
    public async Task<User?> GetUserByIdWithRole(Guid id)
    {
        return await context.Users
            .Include(u => u.Roles)
            .FirstOrDefaultAsync(u => u.Id == id);
    }
    
    public async Task<User?> GetUserById(Guid id)
    {
        return await context.Users.FindAsync(id);
    }
    
    public async Task<IEnumerable<User>> GetUsersByIds(IEnumerable<Guid> userIds)
    {
        return await context.Users
            .Where(u => userIds.Contains(u.Id))
            .ToListAsync();
    }
    
    public async Task<Role?> GetRoleByName(string roleName)
    {
        return await context.Roles
            .FirstOrDefaultAsync(r => r.Name == roleName);
    }
    
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await context.Users
            .Include(u => u.Roles)
            .ToListAsync();
    }

    public async Task<IEnumerable<UserReport>> GetUsersReport(string? email, string? sortBy)
    {
        var baseQuery = context.Users
            .Where(u => u.Roles.Any(r => r.Name == "USER"));
        
        var reportQuery = baseQuery
            .Select(u => new
            {
                User = u,
                TotalSpent = context.Orders
                    .Where(o => o.UserId == u.Id)
                    .Sum(o => (double?)o.PaidPrice) ?? 0,
                TotalItemsPurchased = context.OrderFigures
                    .Where(of => of.UserId == u.Id)
                    .Sum(of => (int?)of.Quantity) ?? 0
            });

        if (!string.IsNullOrWhiteSpace(email))
        {
            reportQuery = reportQuery.Where(r => r.User.Email.Contains(email));
        }

        switch (sortBy)
        {
            case "spent_desc":
                reportQuery = reportQuery.OrderByDescending(r => r.TotalSpent);
                break;
            case "items_desc":
                reportQuery = reportQuery.OrderByDescending(r => r.TotalItemsPurchased);
                break;
            default:
                reportQuery = reportQuery.OrderBy(r => r.User.Email);
                break;
        }

        return await reportQuery
            .Select(r => new UserReport
            {
                Id = r.User.Id,
                Email = r.User.Email,
                Status = r.User.Status,
                TotalSpent = r.TotalSpent,
                TotalItemsPurchased = r.TotalItemsPurchased
            })
            .ToListAsync();
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }
}