using backend.Dtos;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class CommentService
{
    private readonly CommentRepository _commentRepo;
    private readonly FigureRepository _figureRepo;
    
    public CommentService(CommentRepository commentRepo, FigureRepository figureRepo)
    {
        _commentRepo = commentRepo;
        _figureRepo = figureRepo;
    }

    public async Task<IEnumerable<CommentRequest>> GetCommentsForFigure(Guid figureId)
    {
        var comments = await _commentRepo.GetByFigureId(figureId);

        return comments.Select(c => new CommentRequest
        {
            Id = c.Id,
            Vote = c.Vote,
            Content = c.Content,
            CreatedAt = c.CreatedAt,
            User = c.User == null
                ? null
                : new UserSummary
                {
                    Id = c.User.Id,
                    Email = c.User.Email
                }
        });
    }

    public async Task<Comment> CreateComment(CreateCommentRequest request, Guid userId, Guid figureId)
    {
        var figure = await _figureRepo.GetByIdAsync(figureId);
        if (figure == null)
        {
            throw new Exception("Figure not found");
        }

        var comment = new Comment
        {
            UserId = userId,
            FigureId = figureId,
            Vote = request.Vote,
            Content = request.Content
        };
        
        await _commentRepo.AddAsync(comment);
        await _commentRepo.SaveChangesAsync();
        return comment;
    }

    public async Task<string> UpdateComment(Guid commentId,
        UpdateCommentRequest request,
        Guid userId,
        IEnumerable<string> userRoles,
        Guid figureId)
    {
        var comment = await _commentRepo.GetById(commentId);

        if (comment is null) return "Not found";
        
        if (comment.FigureId != figureId) return "Not found";

        bool isOwner = comment.UserId == userId;
        bool isAdmin = userRoles.Contains("Admin");
        
        if(!isOwner && !isAdmin) return "Forbidden";

        comment.Content = request.Content;
        comment.Vote = request.Vote;
        
        _commentRepo.Update(comment);
        await _commentRepo.SaveChangesAsync();
        return "Updated";
    }

    public async Task<string> DeleteComment(Guid commentId, Guid userId, IEnumerable<string> userRoles, Guid figureId)
    {
        var comment = await _commentRepo.GetById(commentId);
        if(comment is null) return "Not found";
        if (comment.FigureId != figureId) return "Not found";
        
        bool isOwner = comment.UserId == userId;
        bool isAdmin = userRoles.Contains("Admin");
        
        if (!isOwner && !isAdmin) return "Forbidden";
        
        _commentRepo.Remove(comment);
        await _commentRepo.SaveChangesAsync();
        return "Deleted";
    }
}