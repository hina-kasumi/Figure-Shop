using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories;

public class VoucherRepository (AppDbContext context)
{
    public async Task<IEnumerable<Voucher>> GetAll()
    {
        return await context.Vouchers.OrderByDescending(v => v.CreatedAt).ToListAsync();
    }
    
    public async Task<Voucher?> GetById(Guid id)
    {
        return await context.Vouchers.FindAsync(id);
    }
    
    public async Task AddAsync(Voucher entity)
    {
        await context.Vouchers.AddAsync(entity);
    }
    
    public void Update(Voucher entity)
    {
        context.Vouchers.Update(entity);
    }
    
    public async Task<Voucher> UpdateAsync(Voucher entity)
    {
        context.Vouchers.Update(entity);
        await context.SaveChangesAsync();
        return entity;
    }    
    public void Remove(Voucher entity)
    {
        context.Vouchers.Remove(entity);
    }
    
    public async Task<int> SaveChangesAsync()
    {
        return await context.SaveChangesAsync();
    }
}