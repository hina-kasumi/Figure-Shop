using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class UserService (UserRepository userRepository)
{
    public async Task<User?> GetUserByEmail(string email)
    {
        var user = await userRepository.GetUserByEmail(email);
        return user;
    }

    public async Task<User> CreateUser(string email, string password, string status, Role[] roles)
    {
        var user = await userRepository.CreateUser(email, password, status, roles);
        return user;
    }
}