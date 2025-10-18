using System.Net;
using backend.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace backend.Utils;

public static class ApiResponseBuilder
{
    public static IActionResult Response<T>(HttpStatusCode statusCode, string message, T data) where T : class
    {
        var api = new ApiResponse<T>((int)statusCode, message, data);
        return new ObjectResult(api) { StatusCode = (int)statusCode };
    }

    public static IActionResult Response<T>(int statusCode, string message, T data) where T : class
    {
        var api = new ApiResponse<T>(statusCode, message, data);
        return new ObjectResult(api) { StatusCode = statusCode };
    }
    
    public static IActionResult Response<T>(HttpStatusCode statusCode, string message, Task<T> data) where T : class
    {
        var api = new ApiResponse<T>((int)statusCode, message, data.Result);
        return new ObjectResult(api) { StatusCode = (int)statusCode };
    }
    
    public static IActionResult Response<T>(int statusCode, string message, Task<T> data) where T : class
    {
        var api = new ApiResponse<T>(statusCode, message, data.Result);
        return new ObjectResult(api) { StatusCode = statusCode };
    }

    public static IActionResult ResponseError(HttpStatusCode statusCode, string message)
    {
        var api = new ApiResponse<object?>((int)statusCode, message, null);
        return new ObjectResult(api) { StatusCode = (int)statusCode };
    }
    
    public static IActionResult ResponseError(int statusCode, string message)
    {
        var api = new ApiResponse<object?>(statusCode, message, null);
        return new ObjectResult(api) { StatusCode = statusCode };
    }
}