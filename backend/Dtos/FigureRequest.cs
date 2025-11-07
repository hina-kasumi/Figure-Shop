namespace backend.Dtos;

public class FigureRequest
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public ICollection<string> ImgSrc { get; set; } = [];
    public double SalePercent { get; set; }
    public int Quantity { get; set; }
    public string Description { get; set; } = "";
    public double Vote { get; set; }
    
    public BranchRequest? Branch { get; set; }
    public CategoryRequest? Category { get; set; }
    
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}