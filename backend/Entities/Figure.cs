using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using backend.Entities.Base;

namespace backend.Entities;

public class Figure : BaseEntity
{
    private string _name = "";
    public Guid? BranchId { get; set; }
    public Guid? CategoryId { get; set; }
    public double Price { get; set; } = 0;
    private string ImgSrcJson { get; set; } = "[]"; 

    [NotMapped]
    public ICollection<string> ImgSrc
    {
        get => string.IsNullOrEmpty(ImgSrcJson)
            ? []
            : JsonSerializer.Deserialize<ICollection<string>>(ImgSrcJson) ?? [];
        set => ImgSrcJson = JsonSerializer.Serialize(value);
    }

    [Range(0, 100)] public double SalePercent { get; set; }
    public int Quantity { get; set; }
    public DateTime? SaleFrom { get; set; }
    public DateTime? SaleTo { get; set; }
    public string Description { get; set; } = "";
    [Range(0, 5)] public required double Vote { get; set; }

    [Required]
    [MaxLength(255)]
    public required string Name
    {
        get => _name;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new ArgumentException("Name cannot be null or whitespace.", nameof(Name));
            }

            _name = value;
        }
    }

    public Branch? Branch { get; set; }
    public Category? Category { get; set; }
    public ICollection<Comment> Comments { get; set; } = new List<Comment>();
}