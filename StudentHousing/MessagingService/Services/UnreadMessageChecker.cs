﻿using MessagingService.Models.Options;
using MessagingService.Repositories.Interfaces;
using MessagingService.Services.Interfaces;
using Microsoft.Extensions.Options;

namespace MessagingService.Services;

public class UnreadMessageChecker : BackgroundService
{
    private readonly IServiceScopeFactory _scopeFactory;
    private readonly IMessageQueueProducer _messageQueueProducer;
    private readonly UnreadMessageOptions _unreadMessageOptions;

    public UnreadMessageChecker(IMessageQueueProducer messageQueueProducer, IServiceScopeFactory scopeFactory, IOptions<UnreadMessageOptions> unreadMessageOptions)
    {
        _messageQueueProducer = messageQueueProducer;
        _scopeFactory = scopeFactory;
        _unreadMessageOptions = unreadMessageOptions.Value;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var timer = new PeriodicTimer(_unreadMessageOptions.CheckInterval);
        while (!stoppingToken.IsCancellationRequested && await timer.WaitForNextTickAsync(stoppingToken))
        {
            using var scope = _scopeFactory.CreateScope();
            var privateChatRepository = scope.ServiceProvider.GetRequiredService<IPrivateChatRepository>();

            var userIds = await privateChatRepository.GetAllUserIds();
            foreach (var id in userIds)
            {
                var unreadCount = await privateChatRepository.GetUserUnreadMessageCount(id);
                if (unreadCount > 0)
                {
                    _messageQueueProducer.SendMessage(id);
                }
            }
        }
    }
}