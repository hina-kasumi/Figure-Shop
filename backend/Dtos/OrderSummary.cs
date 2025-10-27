namespace backend.Dtos;

public class OrderSummary
{
    public Guid Id { get; set; }
    public UserSummary User { get; set; }
    public string Status { get; set; }
    public double TotalPrice { get; set; }
    public double PaidPrice { get; set; }
    public DateTime OrderDate { get; set; }
    public DateTime? DeliveryDate { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string Note { get; set; }
    
    public ICollection<OrderFigureSummary> OrderFigures { get; set; } = [];
}