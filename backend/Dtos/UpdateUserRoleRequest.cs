using System.ComponentModel.DataAnnotations;

namespace backend.Dtos;

public class UpdateUserRoleRequest
{
    [Required]
    public string RoleName { get; set; } = "Admin";
}