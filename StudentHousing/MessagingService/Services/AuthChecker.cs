using System.Text.Json;
using MessagingService.DataTransferObjects;
using MessagingService.Services.Interfaces;

namespace MessagingService.Services;

public class AuthChecker : IAuthChecker
{
    private readonly HttpClient _httpClient = new();

    public async Task<bool> CheckTokenValidity(string? token)
    {
        try
        {
            var response = await _httpClient.GetAsync($"http://identityservice:80/api/user/auth");
            response.EnsureSuccessStatusCode();

            return true;
        }
        catch(HttpRequestException)
        {
            return false;
        }
    }
}