using System.Net;
using Microsoft.Extensions.DependencyInjection;
using Polly;

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

    public static IServiceCollection RegisterResiliencePipelines(this IServiceCollection services)
    {
        services.AddResiliencePipeline("network-retry", builder =>
        {
            builder.AddRetry(new()
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
            builder.AddRetry(new()
            {
                Delay = TimeSpan.FromSeconds(3),
                BackoffType = DelayBackoffType.Exponential,
                MaxRetryAttempts = 3,
                ShouldHandle = args => new ValueTask<bool>(args.Outcome.Exception is HttpRequestException)
            })
            .Build();
        });

        return services;
    }
}