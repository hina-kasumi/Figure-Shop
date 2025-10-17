using System.ComponentModel.DataAnnotations;

namespace backend.Entities;

public class Role
{
    [Required]
    [MaxLength(50)]
    [Key]
    public required string Name { get; set; }
}