using backend.Entities.Base;

namespace backend.Entities;

public class OrderFigure : BaseEntity
{
    public Guid OrderId { get; set; }
    public Guid UserId { get; set; }
    public Guid FigureId { get; set; }
    public int Quantity { get; set; }
    public double Price { get; set; }
}