using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Figure> Figures { get; set; }
    public DbSet<Branch> Branches { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<Voucher> Vouchers { get; set; }
    public DbSet<ShoppingCart> ShoppingCarts { get; set; }
    public DbSet<OrderFigure> OrderFigures { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().Property(u => u.Status).HasConversion<string>();
        modelBuilder.Entity<Order>().Property(o => o.Status).HasConversion<string>();
        modelBuilder.Entity<ShoppingCart>().HasKey(sp => new { sp.FigureId, sp.UserId });
        modelBuilder.Entity<OrderFigure>().HasKey(o => new { o.FigureId, o.UserId });
        
        
        modelBuilder.Entity<User>()
            .HasMany(u => u.Roles)
            .WithMany()
            .UsingEntity(j => j.ToTable("UserRole"));

        modelBuilder.Entity<User>()
            .HasMany(u => u.Orders)
            .WithOne()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Comment>()
            .HasOne(c => c.User)
            .WithMany()
            .HasForeignKey(c => c.UserId);
        
        modelBuilder.Entity<User>()
            .HasMany<ShoppingCart>()
            .WithOne()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Branch>()
            .HasMany(b => b.Figures)
            .WithOne(f => f.Branch)
            .HasForeignKey(f => f.BranchId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Category>()
            .HasMany(c => c.Figures)
            .WithOne(f => f.Category)
            .HasForeignKey(f => f.CategoryId)
            .OnDelete(DeleteBehavior.SetNull);

        modelBuilder.Entity<Figure>()
            .HasMany(f => f.Comments)
            .WithOne()
            .HasForeignKey(f => f.FigureId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Figure>()
            .HasMany<ShoppingCart>()
            .WithOne()
            .HasForeignKey(f => f.FigureId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Figure>()
            .HasMany<OrderFigure>()
            .WithOne()
            .HasForeignKey(f => f.FigureId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Order>()
            .HasMany(o => o.OrderFigures)
            .WithOne()
            .HasForeignKey(o => o.OrderId)
            .OnDelete(DeleteBehavior.Cascade);
        
        modelBuilder.Entity<Order>()
            .HasOne(o => o.Voucher)
            .WithMany()
            .HasForeignKey(o => o.VoucherId)
            .OnDelete(DeleteBehavior.Cascade);
        modelBuilder.Entity<ShoppingCart>(entity =>
        {
            entity.HasKey(sc => new { sc.UserId, sc.FigureId });

            // 2. Cấu hình rõ ràng mối quan hệ với Figure
            // (Để EF biết dùng FigureId chứ không phải FigureId1)
            entity.HasOne(sc => sc.Figure)
                .WithMany() // Giả sử Figure không cần list ShoppingCart
                .HasForeignKey(sc => sc.FigureId)
                .OnDelete(DeleteBehavior.Restrict);
        });
        modelBuilder.Entity<OrderFigure>(entity =>
        {
            entity.HasOne(of => of.Order)
                .WithMany(o => o.OrderFigures) // Tham chiếu tới ICollection trong Order
                .HasForeignKey(of => of.OrderId);

            entity.HasOne(of => of.Figure)
                .WithMany() // Figure không cần biết nó ở Order nào
                .HasForeignKey(of => of.FigureId);
        });
        base.OnModelCreating(modelBuilder);
    }
}