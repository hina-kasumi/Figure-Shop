using backend.Entities;
using backend.Entities.Enum;
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
    
    public async Task<bool> SetUserBanStatus(Guid userId, bool ban)
    {
        var user = await userRepository.GetUserById(userId);
        if (user is null)
        {
            return false;
        }

        user.Status = ban ? StatusEnum.Banned : StatusEnum.Active;

        await userRepository.SaveChangesAsync();
        return true;
    }

    public async Task<string> UpdateUserRole(Guid userId, string roleName, bool grant)
    {
        var user = await userRepository.GetUserByIdWithRole(userId);
        if(user is null) return "User not found";

        var role = await userRepository.GetRoleByName(roleName);
        if(role is null) return $"Role '{roleName}' not found in database.";

        if (grant)
        {
            if (user.Roles.Any(r => r.Name == roleName))
                return "User already has this role.";
            user.Roles.Add(role);
        }
        else
        {
            var roleToRemove = user.Roles.FirstOrDefault(r => r.Name == roleName);
            if(roleToRemove is null)
                return "User does not have this role.";
            user.Roles.Remove(roleToRemove);
        }
        
        await userRepository.SaveChangesAsync();
        return grant ? "Role granted successfully." : "Role revoked successfully.";
    }
    
    public async Task<Role?> GetRoleByName(string roleName)
    {
        return await userRepository.GetRoleByName(roleName);
    }
    
    public async Task<IEnumerable<User>> GetAllUsers()
    {
        return await userRepository.GetAllUsers();
    }
}