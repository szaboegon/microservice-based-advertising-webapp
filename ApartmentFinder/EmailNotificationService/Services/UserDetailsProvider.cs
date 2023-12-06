using System.Runtime.Serialization;
using System.Text.Json;
using EmailNotificationService.Dtos;
using EmailNotificationService.Services.Interfaces;

namespace EmailNotificationService.Services;

public class UserDetailsProvider : IUserDetailsProvider
{
    private readonly HttpClient _httpClient = new();

    public async Task<UserDetailsDto> GetUserDataByIdAsync(int userId)
    {
        var response = await _httpClient.GetAsync($"http://identityservice:80/api/user/user_details/{userId}");
        response.EnsureSuccessStatusCode();

        var responseContent = await response.Content.ReadAsStringAsync();
        var user = JsonSerializer.Deserialize<UserDetailsDto>(responseContent,
            new JsonSerializerOptions(JsonSerializerDefaults.Web));

        return user ?? throw new SerializationException("Serialization returned null.");
    }

}