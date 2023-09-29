using System.Text.Json;
using EmailNotificationService.DataTransferObjects;
using EmailNotificationService.Services.Interfaces;

namespace EmailNotificationService.Services;

public class UserDetailsProvider : IUserDetailsProvider
{
    private readonly HttpClient _httpClient = new();

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