namespace backend.Dtos;

public class OrderFigureSummary
{
    public Guid OrderId { get; set; }
    public Guid FigureId { get; set; }
    public string Name { get; set; }
    public double Price { get; set; }
    public int Quantity { get; set; }
}