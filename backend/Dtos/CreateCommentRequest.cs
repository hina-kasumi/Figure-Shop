using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class CreateCommentRequest
{
    [Required]
    [Range(1, 5)]
    public int Vote { get; set; }

    [Required]
    [MinLength(1)]
    public string Content { get; set; }
}