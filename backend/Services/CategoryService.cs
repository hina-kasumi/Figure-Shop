using backend.Dtos;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class CategoryService
{
    private readonly CategoryRepository _categoryRepository;
    
    public CategoryService(CategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<Category>> GetAllCategories()
    {
        return await _categoryRepository.GetAll();
    }
    
    public async Task<Category?> GetCategoryById(Guid id)
    {
        return await _categoryRepository.GetById(id);
    }
    
    public async Task<Category> CreateAsync(ManageCategoryBranchRequest request)
    {
        var newCategory = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name
        };
        
        await _categoryRepository.AddAsync(newCategory);
        await _categoryRepository.SaveChangesAsync();
        return newCategory;
    }

    public async Task<bool> UpdateAsync(Guid id, ManageCategoryBranchRequest request)
    {
        var category = await _categoryRepository.GetById(id);
        if(category is null) return false;
        
        category.Name = request.Name;
        _categoryRepository.Update(category);
        await _categoryRepository.SaveChangesAsync();
        return true;
    }
    
    public async Task<bool> DeleteAsync(Guid id)
    {
        var category = await _categoryRepository.GetById(id);
        if(category is null) return false;
        
        _categoryRepository.Remove(category);
        await _categoryRepository.SaveChangesAsync();
        return true;
    }
}