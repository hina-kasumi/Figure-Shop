using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class BranchRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<Branch> _dbSet;

    public BranchRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<Branch>();
    }

    public async Task<IEnumerable<Branch>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<Branch?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task AddAsync(Branch branch)
    {
        await _dbSet.AddAsync(branch);
    }

    public void Update(Branch branch)
    {
        _context.Entry(branch).State = EntityState.Modified;
    }

    public void Remove(Branch branch)
    {
        _dbSet.Remove(branch);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
}