using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class CategoryRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<Category> _dbSet;
    
    public CategoryRepository (AppDbContext context)
    {
        this._context = context;
        this._dbSet = context.Set<Category>();
    }
    
    public async Task<IEnumerable<Category>> GetAll()
    {
        return await _dbSet.ToListAsync();
    }
    
    public async Task<Category?> GetById(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }
    
    public async Task AddAsync(Category entity)
    {
        await _dbSet.AddAsync(entity);
    }
    
    public void Update(Category entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
    }
    
    public void Remove(Category entity)
    {
        _dbSet.Remove(entity);
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}