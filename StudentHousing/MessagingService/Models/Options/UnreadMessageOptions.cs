using System.ComponentModel.DataAnnotations;

namespace MessagingService.Models.Options;

public class UnreadMessageOptions
{
    public const string ConfigSectionName = "UnreadMessages";

    [Required]
    public required TimeSpan CheckInterval { get; init; }
}