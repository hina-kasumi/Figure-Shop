using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Entities;
using backend.Entities.Enum;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace backend.Services;

public class AuthService
{
    private readonly string _key;
    private readonly UserService _userService;

    public AuthService(IConfiguration configuration, UserService userService)
    {
        _key = configuration["Jwt:Key"] ?? throw new ArgumentNullException();
        _userService = userService;
    }

    public async Task<string> Login(string email, string password)
    {
        var user = await _userService.GetUserByEmail(email) ?? throw new Exception("User not found");
        if (!BCrypt.Net.BCrypt.Verify(password, user.Password))
            throw new Exception("Wrong password");

        return GenToken(user);
    }

    public async Task<string> Register(string email, string password)
    {
        var user = await _userService.GetUserByEmail(email);
        if (user != null)
            throw new Exception("User is already registered");

        var userRole = await _userService.GetRoleByName("USER");
        user = await _userService.CreateUser(email, password, nameof(StatusEnum.Active), new[]
        { userRole ?? throw new Exception("User role not found")});

        return GenToken(user);
    }

    private string GenToken(User user)
    {
        var claims = new List<Claim>();
        
        claims.Add(new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()));
        claims.Add(new Claim(JwtRegisteredClaimNames.Email, user.Email));
        claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

        foreach (var role in user.Roles)
        {
            claims.Add(new Claim(ClaimTypes.Role, role.Name));
        }

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds
        );
        
        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}