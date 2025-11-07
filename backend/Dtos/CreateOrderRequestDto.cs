namespace backend.Dtos.Order;

using System.ComponentModel.DataAnnotations;

public class CreateOrderRequestDto
{
    [Required]
    [MinLength(1)]
    public List<Guid> CartItemIds { get; set; }

    [Required]
    [StringLength(255)]
    public string Address { get; set; }

    [Required]
    [Phone]
    public string PhoneNumber { get; set; }

    public Guid? VoucherId { get; set; }

    [Required]
    public string PaymentMethod { get; set; }
}