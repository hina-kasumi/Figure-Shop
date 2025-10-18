using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using backend.Entities.Base;

namespace backend.Entities;

public class Voucher : BaseEntity
{
    public double? MinPriceCanUse { get; set; }
    public double? MaxPriceCanDiscount { get; set; }
    private string FiguresAvailableJson { get; set; } = "[]";
    public string Description { get; set; } = "";
    public int Quantity { get; set; } = 0;
    public bool IsActive { get; set; } = false;
    [Range(0, 100)] public double SalePercent { get; set; }
    public DateTime UsedFrom { get; set; }
    public DateTime UsedTo { get; set; }

    public ICollection<string> FiguresAvailable
    {
        get => string.IsNullOrEmpty(FiguresAvailableJson)
            ? []
            : JsonSerializer.Deserialize<ICollection<string>>(FiguresAvailableJson) ?? [];
        set  => FiguresAvailableJson = JsonSerializer.Serialize(value);
    }
}