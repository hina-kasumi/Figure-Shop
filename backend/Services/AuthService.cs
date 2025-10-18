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

        user = await _userService.CreateUser(email, password, nameof(StatusEnum.Active), new[]
        {
            new Role()
            {
                Name = "USER"
            }
        });

        return GenToken(user);
    }

    private string GenToken(User user)
    {
        var claims = new List<Claim>
        {
            new(JwtRegisteredClaimNames.Sub, user.Email),
        };

        var roles = string.Empty;
        user.Roles.ToList().ForEach(role => { roles += role.Name + " "; });
        claims.Add(new Claim("roles", roles));

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}