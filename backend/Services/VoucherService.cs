using backend.Dtos;
using backend.Entities;
using backend.Repositories;

namespace backend.Services;

public class VoucherService (VoucherRepository voucherRepository)
{
    public async Task<IEnumerable<VoucherRequest>> GetAllVoucher()
    {
        var vouchers = await voucherRepository.GetAll();
        
        return vouchers.Select(v => new VoucherRequest
        {
            Id = v.Id,
            MinPriceCanUse = v.MinPriceCanUse,
            MaxPriceCanDiscount = v.MaxPriceCanDiscount,
            FiguresAvailable = v.FiguresAvailable,
            Description = v.Description,
            Quantity = v.Quantity,
            IsActive = v.IsActive,
            SalePercent = v.SalePercent,
            UsedFrom = v.UsedFrom,
            UsedTo = v.UsedTo,
            CreatedAt = v.CreatedAt
        });
    }

    public async Task<Voucher> CreateVoucher(CreateVoucherRequest request)
    {
        var newVoucher = new Voucher
        {
            MinPriceCanUse = request.MinPriceCanUse,
            MaxPriceCanDiscount = request.MaxPriceCanDiscount,
            FiguresAvailable = request.FiguresAvailable,
            Description = request.Description,
            Quantity = request.Quantity,
            IsActive = request.IsActive,
            SalePercent = request.SalePercent,
            UsedFrom = request.UsedFrom.ToUniversalTime(),
            UsedTo = request.UsedTo.ToUniversalTime()
        };
        
        await voucherRepository.AddAsync(newVoucher);
        await voucherRepository.SaveChangesAsync();
        
        return newVoucher;
    }

    public async Task<bool> UpdateVoucher(Guid id, UpdateVoucherRequest request)
    {
        var existingVoucher = await voucherRepository.GetById(id);
        if (existingVoucher is null) return false;
        
        existingVoucher.MinPriceCanUse = request.MinPriceCanUse ?? existingVoucher.MinPriceCanUse;
        existingVoucher.MaxPriceCanDiscount = request.MaxPriceCanDiscount ?? existingVoucher.MaxPriceCanDiscount;
        existingVoucher.FiguresAvailable = request.FiguresAvailable ?? existingVoucher.FiguresAvailable;
        existingVoucher.Description = request.Description ?? existingVoucher.Description;
        existingVoucher.Quantity = request.Quantity ?? existingVoucher.Quantity;
        existingVoucher.IsActive = request.IsActive ?? existingVoucher.IsActive;
        existingVoucher.SalePercent = request.SalePercent ?? existingVoucher.SalePercent;
        existingVoucher.UsedFrom = (request.UsedFrom ?? existingVoucher.UsedFrom).ToUniversalTime();
        existingVoucher.UsedTo = (request.UsedTo ?? existingVoucher.UsedTo).ToUniversalTime();
        existingVoucher.UpdatedAt = DateTime.UtcNow;
        
        voucherRepository.Update(existingVoucher);
        await voucherRepository.SaveChangesAsync();
        
        return true;
    }

    public async Task<bool> DeleteVoucher(Guid id)
    {
        var voucher = await voucherRepository.GetById(id);
        if(voucher is null) return false;
        
        voucherRepository.Remove(voucher);
        await voucherRepository.SaveChangesAsync();
        return true;
    }
}