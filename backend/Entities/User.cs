using backend.Entities.Base;
using backend.Entities.Enum;

namespace backend.Entities;

public class User : BaseEntity
{
    public required string Email { get; set; }
    public required string Password { get; set; }
    public StatusEnum Status { get; set; }
    public ICollection<Role> Roles { get; set; } = [];
    public ICollection<ShoppingCart> ShoppingCarts { get; set; } = [];
    public ICollection<Order> Orders { get; set; } = [];
    
}