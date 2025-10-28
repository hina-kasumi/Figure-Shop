using System.ComponentModel.DataAnnotations;
using backend.Entities.Base;
using backend.Entities.Enum;

namespace backend.Entities;

public class Order : BaseEntity
{
    public required Guid UserId  { get; set; }
    public Guid? VoucherId { get; set; }
    public OrderStatusEnum  Status { get; set; }
    public double TotalPrice { get; set; }
    public double PaidPrice { get; set; }
    [MaxLength(20)]
    public required string PhoneNumber {get; set;}
    [MaxLength(255)]
    public required string Address {get; set;}

    public ICollection<OrderFigure> OrderFigures { get; set; } = new List<OrderFigure>();
    public Voucher Voucher { get; set; }
}