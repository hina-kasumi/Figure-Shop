using backend.Dtos;
using backend.Services;
using backend.Utils;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("/auth")]
public class AuthController(AuthService authService) : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var response = authService.Login(request.Email, request.Password);
        return ApiResponseBuilder
            .Response(200, "Login success", response);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        return ApiResponseBuilder
            .Response(201, "Register success", authService.Register(request.Email, request.Password));
    }
}