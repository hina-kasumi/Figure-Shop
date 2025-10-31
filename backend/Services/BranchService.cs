using backend.Dtos;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class BranchService
{
    private readonly BranchRepository _branchRepository;

    public BranchService(BranchRepository branchRepository)
    {
        _branchRepository = branchRepository;
    }

    public async Task<IEnumerable<Branch>> GetAllAsync()
    {
        return await _branchRepository.GetAllAsync();
    }

    public async Task<Branch?> GetByIdAsync(Guid id)
    {
        return await _branchRepository.GetByIdAsync(id);
    }

    public async Task<Branch> CreateAsync(ManageCategoryBranchRequest request)
    {
        var newBranch = new Branch
        {
            Id = Guid.NewGuid(),
            Name = request.Name
        };

        await _branchRepository.AddAsync(newBranch);
        await _branchRepository.SaveChangesAsync();
        return newBranch;
    }

    public async Task<bool> UpdateAsync(Guid id, ManageCategoryBranchRequest request)
    {
        var branch = await _branchRepository.GetByIdAsync(id);
        if (branch is null)
        {
            return false;
        }

        branch.Name = request.Name;
        _branchRepository.Update(branch);
        await _branchRepository.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var branch = await _branchRepository.GetByIdAsync(id);
        if (branch is null)
        {
            return false;
        }

        _branchRepository.Remove(branch);
        await _branchRepository.SaveChangesAsync();
        return true;
    }
}