using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using backend.Dtos;
using backend.Dtos.Order; // Nơi chứa các DTOs
using backend.Entities.Enum;
using backend.Services; // Nơi chứa OrderStatusEnum

namespace backend.Controllers;

[ApiController]
[Route("api/orders")]
[Authorize] // Yêu cầu token xác thực cho toàn bộ controller
public class OrderController : ControllerBase
{
    private readonly OrderService _orderService;

    // 1. Inject OrderService (BLL)
    public OrderController(OrderService orderService)
    {
        _orderService = orderService;
    }

    /**
     * POST /api/orders
     * Chức năng: Checkout (Thanh toán).
     */
    [HttpPost]
    [ProducesResponseType(typeof(OrderSummary), 201)] // 201 Created
    [ProducesResponseType(400)] // Bad Request
    [ProducesResponseType(401)]
    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequestDto createOrderDto)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized("Không thể xác định người dùng.");
        }

        try
        {
            // BLL sẽ xử lý toàn bộ logic (check kho, voucher, transaction...)
            var orderDto = await _orderService.CreateOrderAsync(userId, createOrderDto);
            
            // Trả về 201 Created, kèm theo link tới resource vừa tạo (API GetOrderDetails)
            return CreatedAtAction(nameof(GetOrderDetails), new { id = orderDto.Id }, orderDto);
        }
        catch (Exception ex)
        {
            // Bắt các lỗi nghiệp vụ (ví dụ: "Hết hàng", "Voucher không hợp lệ")
            return BadRequest(ex.Message);
        }
    }

    /**
     * GET /api/orders
     * Chức năng: Lấy lịch sử tất cả đơn hàng của người dùng.
     */
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<OrderSummary>), 200)]
    [ProducesResponseType(401)]
    public async Task<IActionResult> GetUserOrders([FromQuery] OrderStatusEnum? status)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized("Không thể xác định người dùng.");
        }

        var orders = await _orderService.GetUserOrdersAsync(userId, status);
        return Ok(orders);
    }

    /**
     * GET /api/orders/{id}
     * Chức năng: Lấy thông tin chi tiết của một đơn hàng.
     */
    [HttpGet("{id:guid}", Name = "GetOrderDetails")] // Đặt tên cho CreatedAtAction
    [ProducesResponseType(typeof(OrderSummary), 200)]
    [ProducesResponseType(401)]
    [ProducesResponseType(404)] // Not Found
    public async Task<IActionResult> GetOrderDetails(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized("Không thể xác định người dùng.");
        }

        try
        {
            // BLL sẽ kiểm tra đơn hàng có thuộc về userId này không
            var order = await _orderService.GetOrderDetailsAsync(id, userId);
            return Ok(order);
        }
        catch (Exception ex)
        {
            // Bắt lỗi nếu service throw "Không tìm thấy đơn hàng"
            return NotFound(ex.Message);
        }
    }

    /**
     * PUT /api/orders/{id}/cancel
     * Chức năng: Hủy một đơn hàng.
     */
    [HttpPut("{id:guid}/cancel")]
    [ProducesResponseType(typeof(OrderSummary), 200)]
    [ProducesResponseType(400)] // Bad Request (VD: không thể hủy)
    [ProducesResponseType(401)]
    [ProducesResponseType(404)]
    public async Task<IActionResult> CancelOrder(Guid id)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized("Không thể xác định người dùng.");
        }

        try
        {
            // BLL sẽ kiểm tra logic (VD: chỉ hủy khi Pending) và hoàn kho
            var cancelledOrderDto = await _orderService.CancelOrderAsync(id, userId);
            return Ok(cancelledOrderDto);
        }
        catch (Exception ex)
        {
            // Lỗi có thể là NotFound hoặc BadRequest (Không thể hủy)
            return BadRequest(ex.Message);
        }
    }

    // --- Helper Method ---

    /**
     * Lấy UserId của người dùng đang đăng nhập từ Claims.
     */
    private Guid GetCurrentUserId()
    {
        // ClaimTypes.NameIdentifier thường được dùng để lưu UserId
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        
        if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out Guid userId))
        {
            return userId;
        }
        
        // Trả về Empty nếu không tìm thấy claim
        return Guid.Empty;
    }
}