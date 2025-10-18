namespace backend.Entities;

public class ShoppingCart
{
    public Guid UserId { get; set; }
    public Guid FigureId { get; set; }
    public int Quantity { get; set; } = 0;
    
    public Figure? Figure { get; set; }
}