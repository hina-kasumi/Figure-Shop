using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class ManageCategoryBranchRequest
{
    [Required]
    [MaxLength(255)]
    public string Name { get; set; }
}