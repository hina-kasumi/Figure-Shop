using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly UserService _userService;
    private readonly FigureService _figureService;
    private readonly OrderService _orderService;
    
    public AdminController(UserService userService, FigureService figureService, OrderService orderService)
    {
        _userService = userService;
        _figureService = figureService;
        _orderService = orderService;
    }
    
    [HttpGet("users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsers();
        return Ok(users);
    }

    [HttpPost("users/{id}/ban")]
    public async Task<IActionResult> BanUser(Guid id)
    {
        var sucess = await _userService.SetUserBanStatus(id, true);
        if(!sucess) return NotFound("User not found");
        return NoContent();
    }

    [HttpPost("users/{id}/grant-role")]
    public async Task<IActionResult> GrantRole(Guid id, [FromBody] UpdateUserRoleRequest request)
    {
        var result = await _userService.UpdateUserRole(id, request.RoleName, true);
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
        var result = await _userService.UpdateUserRole(id, request.RoleName, false);
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

    [HttpGet("reports/sold-figures")]
    public async Task<IActionResult> GetSoldFigureReport()
    {
        var report = await _figureService.GetSalesStatisticsAsync();
        return Ok(report);
    }

    [HttpGet("orders/search")]
    public async Task<IActionResult> SearchAllOrders([FromQuery] SearchOrderRequest request)
    {
        var orders = await _orderService.SearchOrder(request);
        return Ok(orders);   
    }

    [HttpPatch("orders/{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusRequest request)
    {
        var success = await _orderService.UpdateOrderStatus(id, request.NewStatus);
        if (!success) return NotFound("Order not found.");
        return NoContent();   
    }
}