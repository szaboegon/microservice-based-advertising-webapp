using System.Text.Json;
using MessagingService.DataTransferObjects;
using MessagingService.Services.Interfaces;

namespace MessagingService.Services;

public class UserDataProvider : IUserDataProvider
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
        catch (Exception ex)
        {
            return null;
        }
    }
}