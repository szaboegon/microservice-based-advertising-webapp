using System.Net;
using System.Net.Sockets;
using MailKit;
using Microsoft.Extensions.DependencyInjection;
using Polly;
using Polly.Retry;

namespace EmailNotificationService.Extensions;

public static class ServiceCollectionExtensions
{
    private static readonly IReadOnlyList<HttpStatusCode?> StatusCodesToRetry = new List<HttpStatusCode?>()
    {
        HttpStatusCode.RequestTimeout,
        HttpStatusCode.TooManyRequests,
        HttpStatusCode.InternalServerError,
        HttpStatusCode.BadGateway,
        HttpStatusCode.ServiceUnavailable,
        HttpStatusCode.GatewayTimeout
    };

    private static readonly IReadOnlyList<Type> EmailExceptionsToRetry = new List<Type>()
    {
        typeof(SocketException),
        typeof(IOException),
        typeof(ProtocolException)
    };

    public static IServiceCollection RegisterResiliencePipelines(this IServiceCollection services)
    {
        services.AddResiliencePipeline("network-retry", builder =>
        {
            builder.AddRetry(new RetryStrategyOptions
            {
                Delay = TimeSpan.FromSeconds(3),
                BackoffType = DelayBackoffType.Exponential,
                MaxRetryAttempts = 3,
                ShouldHandle = args =>
                    new ValueTask<bool>(args.Outcome.Exception is HttpRequestException exception &&
                                        StatusCodesToRetry.Contains(exception.StatusCode)),
            }).Build();
        });

        services.AddResiliencePipeline("email-retry", builder =>
        {
            builder.AddRetry(new RetryStrategyOptions 
            {
                Delay = TimeSpan.FromSeconds(3),
                BackoffType = DelayBackoffType.Exponential,
                MaxRetryAttempts = 3,
                ShouldHandle = ex => new ValueTask<bool>(EmailExceptionsToRetry.Contains(ex.Outcome.Exception?.GetType()))
            })
            .Build();
        });

        return services;
    }
}