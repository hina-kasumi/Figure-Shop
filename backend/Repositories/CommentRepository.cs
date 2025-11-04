using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class CommentRepository(AppDbContext context)
{
    public async Task<Comment?> GetById(Guid id)
    {
        return await context.Comments.FindAsync(id);
    }

    public async Task<IEnumerable<Comment>> GetByFigureId(Guid figureId)
    {
        return await context.Comments
            .Include(c => c.User)
            .Where(c => c.FigureId == figureId)
            .OrderByDescending(c => c.CreatedAt)
            .ToListAsync();
    }
    
    public async Task AddAsync(Comment comment)
    {
        await context.Comments.AddAsync(comment);
    }

    public void Update(Comment comment)
    {
        context.Comments.Update(comment);
    }

    public void Remove(Comment comment)
    {
        context.Comments.Remove(comment);
    }

    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }
}