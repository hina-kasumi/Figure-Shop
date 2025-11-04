namespace backend.Dtos;

public class CommentRequest
{
    public Guid Id { get; set; }
    public int Vote { get; set; }
    public string Content { get; set; }
    public DateTime CreatedAt { get; set; }
    public UserSummary? User { get; set; }
}