using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

// Giả sử DbContext của bạn tên là ApplicationDbContext
public class CartRepository
{
    private readonly AppDbContext _context;

    // Dependency Injection DbContext vào repository
    public CartRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<ShoppingCart>> GetCartItemsByUserIdAsync(Guid userId)
    {
        // Lấy các mục ShoppingCart VÀ 'Include' (JOIN) bảng Figure
        // để có thông tin tên, giá, và ảnh sản phẩm.
        Console.WriteLine("userId in repo: " + userId);
        return await _context.ShoppingCarts
            .Include(sc => sc.Figure) 
            .Where(sc => sc.UserId == userId)
            .ToListAsync();
    }

    public async Task<ShoppingCart> GetItemByUserIdAndProductIdAsync(Guid userId, Guid productId)
    {
        // FindAsync không hoạt động tốt với composite key mà không cấu hình
        // Dùng FirstOrDefaultAsync là cách an toàn nhất
        return await _context.ShoppingCarts
            .FirstOrDefaultAsync(sc => sc.UserId == userId && sc.FigureId == productId);
    }

    public async Task AddItemAsync(ShoppingCart cartItem)
    {
        await _context.ShoppingCarts.AddAsync(cartItem);
    }

    public void DeleteItem(ShoppingCart cartItem)
    {
        _context.ShoppingCarts.Remove(cartItem);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}