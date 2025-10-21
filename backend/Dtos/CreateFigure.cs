using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class CreateFigure
{
    [Required]
    [MaxLength(255)]
    public required string Name { get; set; }
    
    public Guid BranchId { get; set; }
    public Guid CategoryId { get; set; }

    [Range(0, double.MaxValue)] public double Price { get; set; } = 0;
    
    public ICollection<string> ImgSrc { get; set; } = [];

    [Range(0, 100)] public double SalePercent { get; set; } = 0;
    
    public int Quantity { get; set; } = 0;
    
    public DateTime? SaleFrom { get; set; }
    public DateTime? SaleTo { get; set; }
    public string Description { get; set; } = "";
}