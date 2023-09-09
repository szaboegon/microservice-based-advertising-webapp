using System.ComponentModel.DataAnnotations;
using EmailNotificationService.Models.Options;
using EmailNotificationService.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


var builder = Host.CreateApplicationBuilder();

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services
    .AddOptions<RabbitMqOptions>()
    .BindConfiguration(RabbitMqOptions.ConfigSectionName)
    .Validate(options => !string.IsNullOrEmpty(options.ExchangeName) && !string.IsNullOrEmpty(options.QueueName));

builder.Services.AddHostedService<ConsumerService>();

var app = builder.Build();
app.Run();



