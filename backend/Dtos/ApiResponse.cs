namespace backend.Dtos;

public class ApiResponse<T> (int status, string message, T? data)
{
    public int Status { get; set; } = status;
    public string Message { get; set; } = message;
    public T? Data { get; set; } =  data;
}