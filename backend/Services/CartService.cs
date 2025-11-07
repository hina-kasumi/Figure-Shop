using backend.Dtos.Cart;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class CartService 
{
    private readonly CartRepository _cartRepository;
    // Bạn cũng có thể inject IFigureRepository để kiểm tra sản phẩm tồn tại
    // private readonly IFigureRepository _figureRepository; 

    public CartService(CartRepository cartRepository)
    {
        _cartRepository = cartRepository;
    }

    // GET /api/cart
    public async Task<CartDto> GetCartAsync(Guid userId)
    {
        var cartItems = await _cartRepository.GetCartItemsByUserIdAsync(userId);
        
        var itemDtos = new List<CartItemDto>();
        double totalPrice = 0;
        int totalItems = 0;

        foreach (var item in cartItems)
        {
            // Giả sử có logic tính giá sale ở đây
            double unitPrice = CalculateFigureSalePrice(item.Figure);
            double lineTotal = unitPrice * item.Quantity;

            itemDtos.Add(new CartItemDto
            {
                ProductId = item.FigureId,
                Name = item.Figure.Name,
                // ImgSrc = item.Figure.ImgSrc, // Giả sử ImgSrc là string, không phải mảng
                Quantity = item.Quantity,
                OriginalPrice = item.Figure.Price,
                UnitPrice = unitPrice,
                LineTotal = lineTotal
            });

            totalPrice += lineTotal;
            totalItems += item.Quantity;
        }

        return new CartDto
        {
            Items = itemDtos,
            TotalItems = totalItems,
            TotalPrice = totalPrice,
            TotalDiscount = 0 // Tính toán logic giảm giá tổng...
        };
    }

    // POST /api/cart/items
    public async Task AddItemToCartAsync(Guid userId, AddCartItemRequestDto itemDto)
    {
        // Logic nghiệp vụ: Kiểm tra xem item đã có trong giỏ chưa
        var existingItem = await _cartRepository.GetItemByUserIdAndProductIdAsync(userId, itemDto.ProductId);

        if (existingItem != null)
        {
            // Nếu có -> Cập nhật số lượng
            existingItem.Quantity += itemDto.Quantity;
        }
        else
        {
            // Nếu không có -> Thêm mới
            // (Nên kiểm tra xem itemDto.ProductId có tồn tại trong bảng Figure không)
            var newItem = new ShoppingCart
            {
                UserId = userId,
                FigureId = itemDto.ProductId,
                Quantity = itemDto.Quantity
            };
            await _cartRepository.AddItemAsync(newItem);
        }

        await _cartRepository.SaveChangesAsync();
    }

    // PUT /api/cart/items/{cartItemId}
    public async Task UpdateItemInCartAsync(Guid userId, Guid productId, UpdateCartItemRequestDto itemDto)
    {
        var itemToUpdate = await _cartRepository.GetItemByUserIdAndProductIdAsync(userId, productId);

        if (itemToUpdate == null)
        {
            throw new Exception("Item not found in cart"); // Xử lý lỗi
        }

        itemToUpdate.Quantity = itemDto.Quantity;

        await _cartRepository.SaveChangesAsync();
    }

    // DELETE /api/cart/items/{cartItemId}
    public async Task DeleteItemFromCartAsync(Guid userId, Guid productId)
    {
        var itemToDelete = await _cartRepository.GetItemByUserIdAndProductIdAsync(userId, productId);

        if (itemToDelete != null)
        {
            _cartRepository.DeleteItem(itemToDelete);
            await _cartRepository.SaveChangesAsync();
        }
        // Nếu không tìm thấy thì cứ im lặng (hoặc throw lỗi tùy nghiệp vụ)
    }

    // --- Helper private method ---
    private double CalculateFigureSalePrice(Figure figure)
    {
        // Đây là ví dụ logic nghiệp vụ
        if (figure.SalePercent > 0 && 
            figure.SaleFrom <= DateTime.UtcNow && 
            figure.SaleTo >= DateTime.UtcNow)
        {
            return figure.Price * (1 - figure.SalePercent / 100);
        }
        return figure.Price;
    }
}