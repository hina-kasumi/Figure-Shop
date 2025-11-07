namespace backend.Dtos.Cart;

public class CartItemDto
{
    // ID của sản phẩm (từ Figure.id)
    // Đây chính là {cartItemId} được dùng trong API PUT/DELETE
    public Guid ProductId { get; set; } 

    // Tên sản phẩm (từ Figure.name)
    public string Name { get; set; }

    // Đường dẫn ảnh (từ Figure.imgSrc)
    public ICollection<string> ImgSrc { get; set; }

    // Số lượng (từ ShoppingCart.quantity)
    public int Quantity { get; set; }

    // Giá gốc (từ Figure.price)
    public double OriginalPrice { get; set; }

    // Giá bán (giá sau khi đã áp dụng sale từ bảng Figure, ví dụ: salePercent)
    // Server nên tính toán sẵn giá này
    public double UnitPrice { get; set; }

    // Tổng tiền cho dòng sản phẩm này (UnitPrice * Quantity)
    public double LineTotal { get; set; }
}