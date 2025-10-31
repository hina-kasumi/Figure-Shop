using System.ComponentModel.DataAnnotations;
using backend.Entities.Enum;

namespace backend.Dtos;

public class UpdateOrderStatusRequest
{
    [Required]
    public OrderStatusEnum NewStatus { get; set; }
}