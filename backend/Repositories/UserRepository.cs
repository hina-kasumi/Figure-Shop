using backend.Entities;
using backend.Entities.Enum;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class UserRepository(AppDbContext context)
{
    public async Task<User?> GetUserByEmail(string email)
    {
        return await context.Users.Include(u => u.Roles).FirstOrDefaultAsync(u => u.Email == email);
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
}