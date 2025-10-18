using System.Net;
using System.Text.Json;
using backend.Dtos;

namespace backend.Interceptor;

public class GlobalExceptionMiddleware (RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
{

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await next(context); // đi tiếp qua các middleware khác
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Unhandled exception");

            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json";

            var response = new ApiResponse<object?>(500,ex.Message, null);

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}
