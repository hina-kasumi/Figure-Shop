using System.ComponentModel.DataAnnotations;
using backend.Entities.Base;

namespace backend.Entities;

public class Comment : BaseEntity
{
    public Guid UserId { get; set; }

    public Guid FigureId { get; set; }

    [Range(0, 5)]
    public required int Vote { get; set; }

    private string _content = "";

    public required string Content
    {
        get => _content;
        set
        {
            if (string.IsNullOrWhiteSpace(value))
            {
                throw new Exception("Content cannot be empty.");
            }

            _content = value;
        }
    }
    
    public User User { get; set; }
}