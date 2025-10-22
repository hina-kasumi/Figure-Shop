using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class UpdateFigureRequest
{
    [MaxLength(255)]
    public string? Name { get; set; }
    
    public Guid? BranchId { get; set; }
    public Guid? CategoryId { get; set; }
    
    [Range(0, double.MaxValue)]
    public double? Price { get; set; }
    
    public ICollection<string>? ImgSrc { get; set; }
    
    [Range(0, 100)]
    public double? SalePercent { get; set; }
    
    public int? Quantity { get; set; }
    
    public DateTime? SaleFrom { get; set; }
    public DateTime? SaleTo { get; set; }
    public string? Description { get; set; }
}