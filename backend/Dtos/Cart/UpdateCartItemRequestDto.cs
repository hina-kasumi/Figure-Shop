using System.ComponentModel.DataAnnotations;

namespace backend.Dtos.Cart;

public class UpdateCartItemRequestDto
{
    [Required]
    [Range(1, 100)] // Số lượng mới phải lớn hơn 0
    public int Quantity { get; set; }
}