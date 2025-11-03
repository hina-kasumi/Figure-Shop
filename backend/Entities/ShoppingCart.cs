namespace backend.Entities;

public class ShoppingCart
{
    public required Guid UserId { get; set; }
    public required Guid FigureId { get; set; }
    public int Quantity { get; set; } = 0;
    
    public Figure? Figure { get; set; }
}