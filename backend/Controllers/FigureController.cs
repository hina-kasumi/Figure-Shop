using backend.Dtos;
using backend.Services;
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