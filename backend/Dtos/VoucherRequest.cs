using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class VoucherRequest
{
    public Guid Id { get; set; }
    public double? MinPriceCanUse { get; set; }
    public double? MaxPriceCanDiscount { get; set; }
    public ICollection<string> FiguresAvailable { get; set; } = [];
    public string Description { get; set; } = "";
    public int Quantity { get; set; } = 0;
    public bool IsActive { get; set; } = false;
    public double SalePercent { get; set; }
    public DateTime UsedFrom { get; set; }
    public DateTime UsedTo { get; set; }
    public DateTime CreatedAt { get; set; }
}

public class CreateVoucherRequest
{
    public double? MinPriceCanUse { get; set; }
    public double? MaxPriceCanDiscount { get; set; }
    public ICollection<string> FiguresAvailable { get; set; } = [];
    
    [Required]
    public string Description { get; set; } = "";
    
    [Range(0, int.MaxValue)]
    public int Quantity { get; set; } = 0;
    public bool IsActive { get; set; } = false;
    
    [Range(0, 100)] 
    public double SalePercent { get; set; }
    
    [Required]
    public DateTime UsedFrom { get; set; }
    
    [Required]
    public DateTime UsedTo { get; set; }
}

public class UpdateVoucherRequest
{
    public double? MinPriceCanUse { get; set; }
    public double? MaxPriceCanDiscount { get; set; }
    public ICollection<string>? FiguresAvailable { get; set; }
    
    public string? Description { get; set; }
    
    [Range(0, int.MaxValue)]
    public int? Quantity { get; set; }
    public bool? IsActive { get; set; }
    
    [Range(0, 100)] 
    public double? SalePercent { get; set; }
    
    public DateTime? UsedFrom { get; set; }
    public DateTime? UsedTo { get; set; }
}