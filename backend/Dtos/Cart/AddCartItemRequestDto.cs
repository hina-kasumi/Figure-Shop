using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Cart;

public class AddCartItemRequestDto
{
    // ID của sản phẩm (sẽ map với FigureId)
    [Required]
    public Guid ProductId { get; set; }

    [Required]
    [Range(1, 100)] // Đặt một giới hạn hợp lý
    public int Quantity { get; set; }
}