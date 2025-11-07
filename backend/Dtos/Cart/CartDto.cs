namespace backend.Dtos.Cart;

public class CartDto
{
    // Danh sách chi tiết các sản phẩm trong giỏ
    public List<CartItemDto> Items { get; set; }

    // Tổng số lượng sản phẩm (tính tổng quantity của tất cả items)
    public int TotalItems { get; set; }

    // Tổng tiền cuối cùng (đã trừ hết khuyến mãi)
    public double TotalPrice { get; set; }

    // Tổng số tiền được giảm giá (để hiển thị cho người dùng)
    public double TotalDiscount { get; set; }
}