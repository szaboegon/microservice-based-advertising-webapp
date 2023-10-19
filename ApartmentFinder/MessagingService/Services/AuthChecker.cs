using System.Net.Http.Headers;
using MessagingService.Services.Interfaces;

namespace MessagingService.Services;

public class AuthChecker : IAuthChecker
{
    private readonly HttpClient _httpClient = new();

    public async Task<bool> CheckTokenValidity(string? token)
    {
        if (string.IsNullOrEmpty(token))
        {
            return false;
        }

        try
        {
            using var request = new HttpRequestMessage(HttpMethod.Get, "http://identityservice:80/api/user/auth");
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", token);
            var response = await _httpClient.SendAsync(request);
            response.EnsureSuccessStatusCode();

            return true;
        }
        catch(HttpRequestException)
        {
            return false;
        }
    }
}