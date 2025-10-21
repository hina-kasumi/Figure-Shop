using backend.Dtos;
using backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("fig")]
public class FigureController : ControllerBase
{
    private readonly FigureService _figureService;

    public FigureController(FigureService figureService)
    {
        _figureService = figureService;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllFigures()
    {
        var figures = await _figureService.GetAllFiguresAsync();
        return Ok(figures);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetFigureById(Guid id)
    {
        var figure = await _figureService.GetFigureByIdAsync(id);
        if (figure is null)
        {
            return NotFound($"Figure with Id {id} not found.");
        }
        return Ok(figure);
    }

    [HttpPost]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> CreateFigure([FromBody] CreateFigure dto)
    {
        var newFigure = await _figureService.CreateFigureAsync(dto);
        return CreatedAtAction(nameof(GetFigureById), new { id = newFigure.Id }, newFigure);
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> UpdateFigure(Guid id, [FromBody] UpdateFigure dto)
    {
        var success = await _figureService.UpdateFigureAsync(id, dto);
        if (!success)
        {
            return NotFound($"Figure with Id {id} not found.");
        }
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> DeleteFigure(Guid id)
    {
        var success = await _figureService.DeleteFigureAsync(id);
        if (!success)
        {
            return NotFound($"Figure with Id {id} not found.");
        }
        return NoContent();
    }
    
    [HttpGet("search")]
    public async Task<IActionResult> SearchFigure([FromQuery] SearchFigureRequest request)
    {
        try
        {
            var figures = await _figureService.SearchFiguresAsync(request);
            return Ok(figures);
        }
        catch (ArgumentException e)
        {
            return BadRequest(e.Message);
        }
        catch (Exception e)
        {
            return StatusCode(500, $"Internal server error: {e.Message}");
        }
    }
}