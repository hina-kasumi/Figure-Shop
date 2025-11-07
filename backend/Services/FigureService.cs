using backend.Dtos;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class FigureService
{
    private readonly FigureRepository _figureRepository;
    private readonly IWebHostEnvironment _webHostEnvironment;

    public FigureService(FigureRepository figureRepository,  IWebHostEnvironment webHostEnvironment)
    {
        _figureRepository = figureRepository;
        _webHostEnvironment = webHostEnvironment;
    }
    
    public async Task<IEnumerable<FigureRequest>> GetAllFiguresAsync()
    {
        var figures = await _figureRepository.GetAllAsync();

        var figureRequest = figures.Select(f => new FigureRequest
        {
            Id = f.Id,
            Name = f.Name,
            Price = f.Price,
            ImgSrc = f.ImgSrc,
            SalePercent = f.SalePercent,
            Quantity = f.Quantity,
            Description = f.Description,
            Vote = f.Vote,
            Branch = f.Branch == null
                ? null
                : new BranchRequest()
                {
                    Id = f.Branch.Id,
                    Name = f.Branch.Name
                },
            Category = f.Category == null
                ? null
                : new CategoryRequest()
                {
                    Id = f.Category.Id,
                    Name = f.Category.Name
                },
            CreatedAt = f.CreatedAt,
            UpdatedAt = f.UpdatedAt
        });

        return figureRequest;
    }

    public async Task<Figure?> GetFigureByIdAsync(Guid id)
    {
        return await _figureRepository.GetByIdWithDetailsAsync(id);
    }
    
    public async Task<Figure> CreateFigureAsync(CreateFigureRequest dto)
    {
        var imageUrls = new List<string>();
        if (dto.Images != null && dto.Images.Any())
        {
            string uploadFolder = Path.Combine(_webHostEnvironment.WebRootPath, "uploads", "figures");
            Directory.CreateDirectory(uploadFolder);
            
            foreach (var imageFile in dto.Images)
            {
                if (imageFile.Length > 0)
                {
                    string uniqueFileName = Guid.NewGuid().ToString() + Path.GetExtension(imageFile.FileName);
                    string filePath = Path.Combine(uploadFolder, uniqueFileName);

                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(fileStream);
                    }

                    imageUrls.Add($"/uploads/figures/{uniqueFileName}");
                }
            }
        }
        
        var newFigure = new Figure
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            BranchId = dto.BranchId,
            CategoryId = dto.CategoryId,
            Price = dto.Price,
            ImgSrc = imageUrls,
            SalePercent = dto.SalePercent,
            Quantity = dto.Quantity,
            SaleFrom = dto.SaleFrom,
            SaleTo = dto.SaleTo,
            Description = dto.Description,
            Vote = 0,
            CreatedAt = DateTime.UtcNow
        };

        await _figureRepository.AddAsync(newFigure);
        await _figureRepository.SaveChangesAsync();

        return newFigure;
    }
    
    public async Task<bool> UpdateFigureAsync(Guid id, UpdateFigureRequest dto)
    {
        var existingFigure = await _figureRepository.GetByIdAsync(id);
        if (existingFigure is null)
        {
            return false;
        }

        existingFigure.Name = dto.Name ?? existingFigure.Name;
        existingFigure.BranchId = dto.BranchId ?? existingFigure.BranchId;
        existingFigure.CategoryId = dto.CategoryId ?? existingFigure.CategoryId;
        existingFigure.Price = dto.Price ?? existingFigure.Price;
        existingFigure.ImgSrc = dto.ImgSrc ?? existingFigure.ImgSrc;
        existingFigure.SalePercent = dto.SalePercent ?? existingFigure.SalePercent;
        existingFigure.Quantity = dto.Quantity ?? existingFigure.Quantity;
        existingFigure.SaleFrom = dto.SaleFrom;
        existingFigure.SaleTo = dto.SaleTo;
        existingFigure.Description = dto.Description ?? existingFigure.Description;
        existingFigure.UpdatedAt = DateTime.UtcNow;

        _figureRepository.Update(existingFigure);
        await _figureRepository.SaveChangesAsync();
        
        return true;
    }
    
    public async Task<bool> DeleteFigureAsync(Guid id)
    {
        var figureToDelete = await _figureRepository.GetByIdAsync(id);
        if (figureToDelete is null)
        {
            return false;
        }

        _figureRepository.Remove(figureToDelete);
        await _figureRepository.SaveChangesAsync();
        
        return true;
    }

    public async Task<IEnumerable<Figure>> SearchFiguresAsync(SearchFigureRequest request)
    {
        if (request.MinPrice.HasValue && request.MaxPrice.HasValue && request.MinPrice > request.MaxPrice)
        {
            throw new ArgumentException("Giá tối thiểu không thể lớn hơn giá tối đa.");
        }
        
        return await _figureRepository.SearchAsync(
            request.Keyword,
            request.MinPrice,
            request.MaxPrice,
            request.BranchId,
            request.CategoryId,
            request.SortBy
        );
    }
    
    public async Task<IEnumerable<SoldFigureRequest>> GetSalesStatisticsAsync()
    {
        return await _figureRepository.GetSoldFigureReport();
    }
}