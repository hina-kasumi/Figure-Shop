using System.Linq.Expressions;
using backend.Dtos;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class FigureRepository
{
    protected readonly AppDbContext _context;
    protected readonly DbSet<Figure> _dbSet;

    public FigureRepository (AppDbContext context)
    {
        this._context = context;
        this._dbSet = context.Set<Figure>();
    }
    
    public async Task<Figure?> GetByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }
    
    public async Task<Figure?> GetByIdWithDetailsAsync(Guid id)
    {
        return await _dbSet
            .Include(f => f.Branch)
            .Include(f => f.Category)
            .FirstOrDefaultAsync(f => f.Id == id);
    }
    
    public async Task<IEnumerable<Figure>> GetAllAsync()
    {
        return await _dbSet
            .Include(f => f.Category)
            .Include(f => f.Branch)
            .ToListAsync();
    }
    
    public async Task AddAsync(Figure entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public void Update(Figure entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
    }
    
    public async Task<Figure> UpdateAsync(Figure figure)
    {
        _context.Figures.Update(figure);
        await _context.SaveChangesAsync();
        return figure;
    }


    public void Remove(Figure entity)
    {
        _dbSet.Remove(entity);
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await _context.SaveChangesAsync();
    }
    
    public async Task<IEnumerable<Figure>> GetFiguresAsync()
    {
        return await _dbSet.ToListAsync();
    }
    
    public async Task<IEnumerable<Figure>> SearchAsync(
        string keyword, 
        double? minPrice, 
        double? maxPrice, 
        Guid? branchId, 
        Guid? categoryId, 
        string? sortBy)
    {
        var query = _context.Figures.AsQueryable();

        if (!string.IsNullOrWhiteSpace(keyword))
        {
            query = query.Where(f => f.Name.ToLower().Contains(keyword.ToLower()));
        }

        if (minPrice.HasValue)
        {
            query = query.Where(f => f.Price >= minPrice.Value);
        }
        
        if (maxPrice.HasValue)
        {
            query = query.Where(f => f.Price <= maxPrice.Value);
        }

        if (branchId.HasValue)
        {
            query = query.Where(f => f.BranchId == branchId.Value);
        }

        if (categoryId.HasValue)
        {
            query = query.Where(f => f.CategoryId == categoryId.Value);
        }

        if (sortBy == "purchased_desc")
        {
            var queryWithPurchaseCount = query
                .Select(f => new
                {
                    Figure = f,
                    TotalPurchased = _context.OrderFigures
                        .Where(of => of.FigureId == f.Id)
                        .Sum(of => (int?)of.Quantity) ?? 0
                })
                .OrderByDescending(x => x.TotalPurchased)
                .Select(x => x.Figure);
            
            return await queryWithPurchaseCount.ToListAsync();
        }
        
        switch (sortBy)
        {
            case "hot_desc":
                query = query.OrderByDescending(f => f.Vote);
                break;
            case "price_asc":
                query = query.OrderBy(f => f.Price);
                break;
            case "price_desc":
                query = query.OrderByDescending(f => f.Price);
                break;
            default:
                query = query.OrderBy(f => f.Name);
                break;
        }
        
        return await query.ToListAsync();
    }

    public async Task<IEnumerable<SoldFigureRequest>> GetSoldFigureReport()
    {
        var report = await _context.OrderFigures.GroupBy(of => of.FigureId)
            .Select(g => new
            {
                FigureId = g.Key,
                TotalQuantitySold = g.Sum(of => of.Quantity)
            })
            .Join(
                _context.Figures,
                reportItem => reportItem.FigureId,
                figure => figure.Id,
                (reportItem, figure) => new SoldFigureRequest
                {
                    FigureId = reportItem.FigureId,
                    FigureName = figure.Name,
                    TotalQuantitySold = reportItem.TotalQuantitySold
                }
            )
            .OrderByDescending(request => request.TotalQuantitySold)
            .ToListAsync();
        return report;
    }
}