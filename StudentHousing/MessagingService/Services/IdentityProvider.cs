using System.Text.Json;
using MessagingService.DataTransferObjects;
using MessagingService.Services.Interfaces;

namespace MessagingService.Services;

public class IdentityProvider : IIdentityProvider
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
        catch(HttpRequestException ex)
        {
            return false;
        }
    }

    public async Task<UserDetailsDto?> GetUserDataByIdAsync(int userId)
    {
        try
        {
            var response = await _httpClient.GetAsync($"http://identityservice:80/api/user/user_details/{userId}");
            response.EnsureSuccessStatusCode();

            var user = JsonSerializer.Deserialize<UserDetailsDto>(response.Content.ReadAsStringAsync().Result, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            return user;
        }
        catch (HttpRequestException)
        {
            return null;
        }
    }
}