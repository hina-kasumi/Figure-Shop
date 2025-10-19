using System.Linq.Expressions;
using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class FigureRepository(AppDbContext context)
{
    public async Task<IEnumerable<Figure>> SearchAsync(
        string keyword, 
        double? minPrice, 
        double? maxPrice, 
        Guid? branchId, 
        string? sortBy)
    {
        var query = context.Figures.AsQueryable();

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

        if (sortBy == "purchased_desc")
        {
            var queryWithPurchaseCount = query
                .Select(f => new
                {
                    Figure = f,
                    TotalPurchased = context.OrderFigures
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
}