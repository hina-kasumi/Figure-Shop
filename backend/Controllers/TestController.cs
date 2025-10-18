using backend.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
[Authorize]
public class TestController : ControllerBase
{
    [HttpGet]
    public IActionResult Index()
    {
        return ApiResponseBuilder.Response(200, "Hello World", "Hello World");
    }
}