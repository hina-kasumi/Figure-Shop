using backend.Entities;
using backend.Entities.Enum;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class DataSeeder
{
    public static async Task SeedAsync(IServiceProvider serviceProvider)
    {
        using (var scope = serviceProvider.CreateScope())
        {
            var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            
            await context.Database.EnsureCreatedAsync();
            
            var (adminRole, userRole) = await SeedRolesAsync(context);
            var (adminUser, testUser1) = await SeedUsersAsync(context, adminRole, userRole);
            var (bandai, gsc, koto, mg, hg, nendo, figma) = await SeedCategoriesAndBranchesAsync(context);
            var voucher5pt = await SeedVouchersAsync(context);
            var figures = await SeedFiguresAsync(context, bandai, gsc, koto, mg, hg, nendo, figma);
            
            await SeedOrdersAsync(context, testUser1, figures, voucher5pt);
        }
    }
    
    private static async Task<(Role, Role)> SeedRolesAsync(AppDbContext context)
    {
        var adminRole = await AddRoleIfNotExistsAsync(context, "Admin");
        var userRole = await AddRoleIfNotExistsAsync(context, "USER");
        return (adminRole, userRole);
    }
    
    private static async Task<(User, User)> SeedUsersAsync(AppDbContext context, Role adminRole, Role userRole)
    {
        var adminUser = await AddUserIfNotExistsAsync(context,
            "admin@shop.com", "Admin123!",
            StatusEnum.Active,
            new List<Role> { adminRole, userRole });
        var testUser1 = await AddUserIfNotExistsAsync(context,
            "user@shop.com", "User123!",
            StatusEnum.Active,
            new List<Role> { userRole });
        
        return (adminUser, testUser1);
    }
    
    private static async Task<(Branch, Branch, Branch, Category, Category, Category, Category)> SeedCategoriesAndBranchesAsync(AppDbContext context)
    {
        var bandai = await AddBranchIfNotExistsAsync(context, "Bandai");
        var gsc = await AddBranchIfNotExistsAsync(context, "Good Smile Company");
        var koto = await AddBranchIfNotExistsAsync(context, "Kotobukiya");

        var mg = await AddCategoryIfNotExistsAsync(context, "Master Grade (MG)");
        var hg = await AddCategoryIfNotExistsAsync(context, "High Grade (HG)");
        var nendo = await AddCategoryIfNotExistsAsync(context, "Nendoroid");
        var figma = await AddCategoryIfNotExistsAsync(context, "Figma");
        
        return (bandai, gsc, koto, mg, hg, nendo, figma);
    }
    
    private static async Task<List<Figure>> SeedFiguresAsync(AppDbContext context, Branch bandai, Branch gsc, Branch koto, Category mg, Category hg, Category nendo, Category figma)
    {
        if (await context.Figures.AnyAsync())
        {
            return await context.Figures.ToListAsync();
        }

        var figures = new List<Figure>
        {
            // Bandai - MG
            new Figure { Name = "MG Freedom Gundam 2.0", BranchId = bandai.Id, CategoryId = mg.Id, Price = 1200000,
                Quantity = 50, Vote = 4.8, ImgSrc = ["https://placehold.co/600x600/grey/white?text=MG+Freedom"],
                Description = "MG Freedom Gundam 2.0 from Gundam SEED." },
            new Figure { Name = "MG Barbatos Gundam", BranchId = bandai.Id, CategoryId = mg.Id, Price = 1100000,
                Quantity = 40, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=MG+Barbatos"],
                Description = "MG Barbatos from Gundam IBO." },
            new Figure { Name = "MG Sazabi Ver. Ka", BranchId = bandai.Id, CategoryId = mg.Id, Price = 2500000,
                Quantity = 20, Vote = 5.0, ImgSrc = ["https://placehold.co/600x600/grey/white?text=MG+Sazabi"],
                Description = "MG Sazabi Ver. Ka, a masterpiece." },
            new Figure { Name = "MG Nu Gundam Ver. Ka", BranchId = bandai.Id, CategoryId = mg.Id, Price = 2200000,
                Quantity = 25, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=MG+Nu"],
                Description = "MG Nu Gundam Ver. Ka from Char's Counterattack." },
            new Figure { Name = "MG Dynames Gundam", BranchId = bandai.Id, CategoryId = mg.Id, Price = 1150000,
                Quantity = 30, Vote = 4.7, ImgSrc = ["https://placehold.co/600x600/grey/white?text=MG+Dynames"],
                Description = "MG Dynames from Gundam 00." },

            // Bandai - HG
            new Figure { Name = "HG Aerial Gundam", BranchId = bandai.Id, CategoryId = hg.Id, Price = 350000,
                Quantity = 100, Vote = 4.5, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HG+Aerial"],
                Description = "HG Aerial from G-Witch." },
            new Figure { Name = "HG Moon Gundam", BranchId = bandai.Id, CategoryId = hg.Id, Price = 700000,
                Quantity = 50, Vote = 4.8, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HG+Moon"],
                Description = "HG Moon Gundam, a very popular HG kit." },
            new Figure { Name = "HG Penelope Gundam", BranchId = bandai.Id, CategoryId = hg.Id, Price = 1800000,
                Quantity = 15, Vote = 4.6, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HG+Penelope"],
                Description = "A massive HG kit from Hathaway's Flash." },
            new Figure { Name = "HG Beguir-Beu", BranchId = bandai.Id, CategoryId = hg.Id, Price = 400000,
                Quantity = 60, Vote = 4.3, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HG+Beguir"],
                Description = "HG Beguir-Beu from G-Witch." },
            new Figure { Name = "HG Lfrith Gundam", BranchId = bandai.Id, CategoryId = hg.Id, Price = 400000,
                Quantity = 70, Vote = 4.4, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HG+Lfrith"],
                Description = "HG Lfrith, the prototype from G-Witch." },

            // Good Smile Company - Nendoroid
            new Figure { Name = "Nendoroid Anya Forger", BranchId = gsc.Id, CategoryId = nendo.Id, Price = 1100000,
                Quantity = 80, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Nendo+Anya"],
                Description = "Heh. From Spy x Family." },
            new Figure { Name = "Nendoroid Gawr Gura", BranchId = gsc.Id, CategoryId = nendo.Id, Price = 1200000,
                Quantity = 30, Vote = 4.8, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Nendo+Gura"],
                Description = "A. From Hololive." },
            new Figure { Name = "Nendoroid Bocchi", BranchId = gsc.Id, CategoryId = nendo.Id, Price = 1150000,
                Quantity = 40, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Nendo+Bocchi"],
                Description = "Hitori Gotoh from Bocchi the Rock!" },
            new Figure { Name = "Nendoroid Gojo Satoru", BranchId = gsc.Id, CategoryId = nendo.Id, Price = 1250000,
                Quantity = 50, Vote = 4.7, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Nendo+Gojo"],
                Description = "Gojo Satoru from Jujutsu Kaisen." },
            new Figure { Name = "Nendoroid Hatsune Miku 2.0", BranchId = gsc.Id, CategoryId = nendo.Id, Price = 900000,
                Quantity = 60, Vote = 4.6, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Nendo+Miku"],
                Description = "The classic, updated." },

            // Good Smile Company - Figma
            new Figure { Name = "Figma Doom Slayer", BranchId = gsc.Id, CategoryId = figma.Id, Price = 2500000,
                Quantity = 20, Vote = 5.0, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Figma+Doom"],
                Description = "Rip and tear." },
            new Figure { Name = "Figma Samus Aran (Dread ver.)", BranchId = gsc.Id, CategoryId = figma.Id, Price = 2200000,
                Quantity = 25, Vote = 4.8, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Figma+Samus"],
                Description = "Samus from Metroid Dread." },
            new Figure { Name = "Figma Nobara Kugisaki", BranchId = gsc.Id, CategoryId = figma.Id, Price = 1800000,
                Quantity = 30, Vote = 4.5, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Figma+Nobara"],
                Description = "Nobara Kugisaki from Jujutsu Kaisen." },
            new Figure { Name = "Figma Kiryu Kazuma", BranchId = gsc.Id, CategoryId = figma.Id, Price = 1900000,
                Quantity = 20, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Figma+Kiryu"],
                Description = "The Dragon of Dojima." },

            // Kotobukiya
            new Figure { Name = "HMM Liger Zero", BranchId = koto.Id, CategoryId = mg.Id, Price = 1600000,
                Quantity = 30, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HMM+Liger"],
                Description = "HMM Liger Zero from Zoids." },
            new Figure { Name = "Megami Device AUV Susanowo", BranchId = koto.Id, CategoryId = hg.Id, Price = 1800000,
                Quantity = 25, Vote = 4.8, ImgSrc = ["https://placehold.co/600x600/grey/white?text=Megami+Susanowo"],
                Description = "A popular Megami Device kit." },
            new Figure { Name = "Frame Arms Girl Hresvelgr=Ater", BranchId = koto.Id, CategoryId = hg.Id, Price = 1300000,
                Quantity = 30, Vote = 4.6, ImgSrc = ["https://placehold.co/600x600/grey/white?text=FA+Girl+Hres"],
                Description = "A Frame Arms Girl kit." },
            new Figure { Name = "ARTFX J Shinmon Benimaru", BranchId = koto.Id, CategoryId = figma.Id, Price = 3500000,
                Quantity = 15, Vote = 4.9, ImgSrc = ["https://placehold.co/600x600/grey/white?text=ARTFX+Beni"],
                Description = "Benimaru from Fire Force." },
            new Figure { Name = "HMM Gojulas the Ogre", BranchId = koto.Id, CategoryId = mg.Id, Price = 8000000,
                Quantity = 5, Vote = 5.0, ImgSrc = ["https://placehold.co/600x600/grey/white?text=HMM+Gojulas"],
                Description = "The massive Gojulas the Ogre from Zoids." },
        };
        
        var random = new Random();
        foreach (var fig in figures
                     .Where(f => f.Price < 2000000)
                     .OrderBy(f => random.Next())
                     .Take(5))
        {
            fig.SalePercent = random.Next(10, 31);
            fig.SaleFrom = DateTime.UtcNow.AddDays(-10);
            fig.SaleTo = DateTime.UtcNow.AddDays(20);
        }

        await context.Figures.AddRangeAsync(figures);
        await context.SaveChangesAsync();
        
        return figures;
    }
    
    private static async Task<Voucher> SeedVouchersAsync(AppDbContext context)
    {
        var voucher = await context.Vouchers.FirstOrDefaultAsync(v => v.SalePercent == 5);
        if (voucher == null)
        {
            voucher = new Voucher
            {
                Description = "Voucher giảm 5% cho đơn hàng đầu tiên",
                Quantity = 1000,
                IsActive = true,
                SalePercent = 5,
                UsedFrom = DateTime.UtcNow.AddDays(-1),
                UsedTo = DateTime.UtcNow.AddYears(1),
                MinPriceCanUse = 0,
                MaxPriceCanDiscount = 100000
            };
            await context.Vouchers.AddAsync(voucher);
            await context.SaveChangesAsync();
        }
        return voucher;
    }

    private static async Task SeedOrdersAsync(AppDbContext context, User user, List<Figure> figures, Voucher voucher5pt)
    {
        if (await context.Orders.AnyAsync()) return;
        
        if (figures.Count < 3) return;

        var order1Figures = new List<OrderFigure>
        {
            new OrderFigure { FigureId = figures[0].Id, UserId = user.Id, Quantity = 1, Price = figures[0].Price },
            new OrderFigure { FigureId = figures[5].Id, UserId = user.Id, Quantity = 2, Price = figures[5].Price }
        };
        var order1 = new Order
        {
            UserId = user.Id,
            Status = OrderStatusEnum.Completed,
            PhoneNumber = "0900111222",
            Address = "123 Đường ABC, Quận 1, TP.HCM",
            OrderFigures = order1Figures,
            TotalPrice = order1Figures.Sum(of => of.Price * of.Quantity),
            PaidPrice = order1Figures.Sum(of => of.Price * of.Quantity) * 0.95,
            VoucherId = voucher5pt.Id
        };

        var order2Figures = new List<OrderFigure>
        {
            new OrderFigure { FigureId = figures[10].Id, UserId = user.Id, Quantity = 1, Price = figures[10].Price }
        };
        var order2 = new Order
        {
            UserId = user.Id,
            Status = OrderStatusEnum.Pending,
            PhoneNumber = "0900333444",
            Address = "456 Đường XYZ, Quận 3, TP.HCM",
            OrderFigures = order2Figures,
            TotalPrice = order2Figures.Sum(of => of.Price * of.Quantity),
            PaidPrice = order2Figures.Sum(of => of.Price * of.Quantity),
            VoucherId = null
        };

        await context.Orders.AddRangeAsync(order1, order2);
        await context.SaveChangesAsync();
    }
    
    private static async Task<Role> AddRoleIfNotExistsAsync(AppDbContext context, string roleName)
    {
        var role = await context.Roles.FirstOrDefaultAsync(r => r.Name == roleName);
        if (role == null)
        {
            role = new Role { Name = roleName };
            await context.Roles.AddAsync(role);
            await context.SaveChangesAsync();
        }
        return role;
    }
    
    private static async Task<User> AddUserIfNotExistsAsync(AppDbContext context, string email, string password, StatusEnum status, List<Role> roles)
    {
        var user = await context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
        {
            var roleNames = roles.Select(r => r.Name).ToList();
            var existingRoles = await context.Roles.Where(r => roleNames.Contains(r.Name)).ToListAsync();

            user = new User
            {
                Email = email,
                Password = BCrypt.Net.BCrypt.HashPassword(password),
                Status = status,
                Roles = existingRoles
            };
            await context.Users.AddAsync(user);
            await context.SaveChangesAsync();
        }
        return user;
    }

    private static async Task<Branch> AddBranchIfNotExistsAsync(AppDbContext context, string name)
    {
        var branch = await context.Branches.FirstOrDefaultAsync(b => b.Name == name);
        if (branch == null)
        {
            branch = new Branch { Name = name };
            await context.Branches.AddAsync(branch);
            await context.SaveChangesAsync();
        }
        return branch;
    }

    private static async Task<Category> AddCategoryIfNotExistsAsync(AppDbContext context, string name)
    {
        var category = await context.Categories.FirstOrDefaultAsync(c => c.Name == name);
        if (category == null)
        {
            category = new Category { Name = name };
            await context.Categories.AddAsync(category);
            await context.SaveChangesAsync();
        }
        return category;
    }
}