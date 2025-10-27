namespace backend.Dtos;

public class SoldFigureRequest
{
    public Guid FigureId { get; set; }
    public string FigureName { get; set; }
    public int TotalQuantitySold { get; set; }
}