namespace MessagingService.Services.Interfaces;

public interface IAuthChecker
{
    Task<bool> CheckTokenValidity(string? token);
}