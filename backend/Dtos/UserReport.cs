using backend.Entities.Enum;

namespace backend.Dtos;

public class UserReport
{
    public Guid Id { get; set; }
    public string Email { get; set; }
    public StatusEnum Status { get; set; }
    
    public double TotalSpent { get; set; }
    
    public int TotalItemsPurchased { get; set; }
}