
using System.Security.Claims;
using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace backend.Controllers;

[ApiController]
[Route("fig/{figureId}/comments")]
public class CommentController (CommentService commentService) : ControllerBase
{
    private Guid GetUserId()
    {
        var userIdString = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (string.IsNullOrEmpty(userIdString))
            throw new Exception("User ID not found in token.");
        return Guid.Parse(userIdString);
    }

    private IEnumerable<string> GetUserRoles()
    {
        return User.FindAll(ClaimTypes.Role).Select(c => c.Value);
    }
    
    [HttpGet]
    [AllowAnonymous]
    public async Task<IActionResult> GetCommentsForFigure(Guid figureId)
    {
        var comments = await commentService.GetCommentsForFigure(figureId);
        return Ok(comments);
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> CreateComment(Guid figureId, [FromBody] CreateCommentRequest request)
    {
        try
        {
            var userId = GetUserId();
            var comment = await commentService.CreateComment(request, userId, figureId);

            var dtoResponse = new CommentRequest
            {
                Id = comment.Id,
                Vote = comment.Vote,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                User = new UserSummary
                    { Id = userId, Email = User.FindFirstValue(ClaimTypes.Email) ?? "N/A" }
            };
            
            Console.WriteLine($"[INFO] Email: {User.FindFirstValue(ClaimTypes.Email)}");
            
            return CreatedAtAction(nameof(GetCommentsForFigure), new {figureId = figureId, id = comment.Id}, dtoResponse);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"[ERROR] CreateComment Failed: {User.FindFirstValue(ClaimTypes.NameIdentifier)}");
            return BadRequest(ex.Message);
        }
    }

    [HttpPut("{commentId}")]
    [Authorize]
    public async Task<IActionResult> UpdateComment(Guid commentId, [FromBody] UpdateCommentRequest request, Guid figureId)
    {
        var result = await commentService.UpdateComment(commentId, request, GetUserId(), GetUserRoles(), figureId);
        
        if(result == "Not found") return NotFound("Comment not found.");
        if(result == "Forbidden") return Forbid("Forbidden.");
        return NoContent();
    }

    [HttpDelete("{commentId}")]
    public async Task<IActionResult> DeleteComment(Guid commentId, Guid figureId)
    {
        var result = await commentService.DeleteComment(commentId, GetUserId(), GetUserRoles(), figureId);
        
        if(result == "Not found") return NotFound("Comment not found.");
        if(result == "Forbidden") return Forbid("Forbidden.");
        
        return NoContent();
    }
}