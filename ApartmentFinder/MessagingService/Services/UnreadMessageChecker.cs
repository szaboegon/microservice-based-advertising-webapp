using MessagingService.Dtos;
using MessagingService.Models.Options;
using MessagingService.Repositories.Interfaces;
using MessagingService.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace MessagingService.Services;

public class UnreadMessageChecker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IMessageQueueProducer _messageQueueProducer;
    private readonly UnreadMessageOptions _unreadMessageOptions;

    private readonly ILogger<UnreadMessageChecker> _logger;

    public UnreadMessageChecker(IMessageQueueProducer messageQueueProducer, IServiceScopeFactory scopeFactory,
        IOptions<UnreadMessageOptions> unreadMessageOptions, ILogger<UnreadMessageChecker> logger)
    {
        _messageQueueProducer = messageQueueProducer;
        _scopeFactory = scopeFactory;
        _logger = logger;
        _unreadMessageOptions = unreadMessageOptions.Value;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(_unreadMessageOptions.CheckInterval);
        while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
        {
            _logger.LogInformation("Checking for unread messages...");
            try
            {
                using var scope = _scopeFactory.CreateScope();
                var privateChatRepository = scope.ServiceProvider.GetRequiredService<IPrivateChatRepository>();

                var userIds = await privateChatRepository.GetAllUserIds();
                foreach (var id in userIds)
                {
                    var unreadCount = await privateChatRepository.GetUserUnreadMessageCount(id);
                    if (unreadCount <= 0) continue;
                    var notification = new UnreadMessageNotificationDto()
                    {
                        UserId = id,
                        UnreadMessageCount = unreadCount
                    };
                    _messageQueueProducer.SendMessage(notification);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError("An exception occurred while checking for unread messages: {Exception}", ex);
            }
        }
    }
}