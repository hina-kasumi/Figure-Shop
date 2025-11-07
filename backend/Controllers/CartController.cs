using backend.Services;
using backend.Dtos.Cart;

namespace backend.Controllers;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims; // Cần thiết để lấy UserId

[ApiController]
[Route("api/cart")]
[Authorize] // Yêu cầu xác thực cho tất cả các API trong Controller này
public class CartController : ControllerBase
{
    private readonly CartService _cartService;

    // 1. Dependency Injection service vào controller
    public CartController(CartService cartService)
    {
        _cartService = cartService;
    }

    /**
     * GET /api/cart
     * Chức năng: Lấy toàn bộ sản phẩm trong giỏ hàng của người dùng.
     */
    [HttpGet]
    public async Task<IActionResult> GetCart()
    {
        // Lấy UserId từ token (đã được xác thực)
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized("Không thể xác định người dùng.");
        }

        var cartDto = await _cartService.GetCartAsync(userId);
        return Ok(cartDto);
    }

    /**
     * POST /api/cart/items
     * Chức năng: Thêm một sản phẩm vào giỏ hàng.
     */
    [HttpPost("items")]
    public async Task<IActionResult> AddItemToCart([FromBody] AddCartItemRequestDto itemDto)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        // Service sẽ xử lý logic nghiệp vụ (thêm mới hoặc cộng dồn số lượng)
        await _cartService.AddItemToCartAsync(userId, itemDto);
        
        // Trả về 200 OK (hoặc 204 NoContent) để báo thành công
        return Ok("Sản phẩm đã được thêm vào giỏ hàng.");
    }

    /**
     * PUT /api/cart/items/{cartItemId}
     * Chức năng: Cập nhật số lượng của một sản phẩm đã có trong giỏ.
     * {cartItemId} ở đây chính là ProductId (FigureId)
     */
    [HttpPut("items/{productId:guid}")]
    public async Task<IActionResult> UpdateCartItem(Guid productId, [FromBody] UpdateCartItemRequestDto itemDto)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        try
        {
            await _cartService.UpdateItemInCartAsync(userId, productId, itemDto);
            return Ok("Cập nhật số lượng thành công.");
        }
        catch (Exception ex)
        {
            // Có thể bắt lỗi cụ thể hơn, ví dụ: NotFoundException
            return NotFound(ex.Message); 
        }
    }

    /**
     * DELETE /api/cart/items/{cartItemId}
     * Chức năng: Xóa một sản phẩm khỏi giỏ hàng.
     * {cartItemId} ở đây chính là ProductId (FigureId)
     */
    [HttpDelete("items/{productId:guid}")]
    public async Task<IActionResult> DeleteCartItem(Guid productId)
    {
        var userId = GetCurrentUserId();
        if (userId == Guid.Empty)
        {
            return Unauthorized();
        }

        await _cartService.DeleteItemFromCartAsync(userId, productId);
        
        // 204 NoContent là response chuẩn cho một hành động DELETE thành công
        return NoContent(); 
    }


    // --- Helper Method ---

    /**
     * Lấy UserId của người dùng đang đăng nhập từ ClaimsPrincipal.
     * Cách triển khai này phụ thuộc vào cách bạn thiết lập JWT/Identity.
     */
    private Guid GetCurrentUserId()
    {
        // Tên Claim chuẩn cho User ID là "sub" (Subject) hoặc "nameidentifier"
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        
        if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out Guid userId))
        {
            return userId;
        }
        
        // Trả về Empty nếu không tìm thấy hoặc không parse được
        return Guid.Empty;
    }
}