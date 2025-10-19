using backend.Dtos;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class FigureService
{
    private readonly FigureRepository _figureRepository;

    public FigureService(FigureRepository figureRepository)
    {
        _figureRepository = figureRepository;
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
            request.SortBy
        );
    }
}