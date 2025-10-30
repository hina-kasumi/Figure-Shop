using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("admin/voucher")]
[Authorize(Roles = "Admin")]
public class VoucherController (VoucherService voucherService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetAllVoucher()
    {
        var vouchers = await voucherService.GetAllVoucher();
        return Ok(vouchers);
    }

    [HttpPost]
    public async Task<IActionResult> CreateVoucher([FromBody] CreateVoucherRequest request)
    {
        var newVoucher = await voucherService.CreateVoucher(request);

        var responseDto = new VoucherRequest
        {
            Id = newVoucher.Id,
            MinPriceCanUse = newVoucher.MinPriceCanUse,
            MaxPriceCanDiscount = newVoucher.MaxPriceCanDiscount,
            FiguresAvailable = newVoucher.FiguresAvailable,
            Description = newVoucher.Description,
            Quantity = newVoucher.Quantity,
            IsActive = newVoucher.IsActive,
            SalePercent = newVoucher.SalePercent,
            UsedFrom = newVoucher.UsedFrom,
            UsedTo = newVoucher.UsedTo,
            CreatedAt = newVoucher.CreatedAt
        };
        
        return CreatedAtAction(nameof(GetAllVoucher), new {id = newVoucher.Id}, responseDto);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateVoucher(Guid id, [FromBody] UpdateVoucherRequest request)
    {
        var success = await voucherService.UpdateVoucher(id, request);
        if (!success)
        {
            return NotFound($"Voucher not found.");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVoucher(Guid id)
    {
        var success = await voucherService.DeleteVoucher(id);
        if (!success)
        {
            return NotFound($"Voucher not found.");
        }
        return NoContent();   
    }
}