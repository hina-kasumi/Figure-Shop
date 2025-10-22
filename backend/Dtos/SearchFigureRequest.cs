namespace backend.Dtos;

public class SearchFigureRequest
{
    public string Keyword { get; set; }
    
    public double? MinPrice { get; set; }
    public double? MaxPrice { get; set; }
    
    public Guid? BranchId { get; set; }
    
    public string? SortBy { get; set; }
}