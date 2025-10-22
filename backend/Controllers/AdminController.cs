using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("/admin")]
[Authorize(Roles = "Admin")]
public class AdminController (UserService userService) : ControllerBase
{
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await userService.GetAllUsers();
        return Ok(users);
    }

    [HttpPost("users/{id}/ban")]
    public async Task<IActionResult> BanUser(Guid id)
    {
        var sucess = await userService.SetUserBanStatus(id, true);
        if(!sucess) return NotFound("User not found");
        return NoContent();
    }

    [HttpPost("users/{id}/grant-role")]
    public async Task<IActionResult> GrantRole(Guid id, [FromBody] UpdateUserRoleRequest request)
    {
        var result = await userService.UpdateUserRole(id, request.RoleName, true);
        if (result.Contains("not found"))
        {
            return NotFound(result);
        }
        if (result.Contains("already has"))
        {
            return BadRequest(result);
        }
        return Ok(result);
    }

    [HttpPost("users/{id}/revoke-role")]
    public async Task<IActionResult> RevokeRole(Guid id, [FromBody] UpdateUserRoleRequest request)
    {
        var result = await userService.UpdateUserRole(id, request.RoleName, false);
        if (result.Contains("not found"))
        {
            return NotFound(result);
        }
        if (result.Contains("does not have"))
        {
            return BadRequest(result);
        }
        return Ok(result);
    }
}