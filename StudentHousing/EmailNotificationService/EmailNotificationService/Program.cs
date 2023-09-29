using System.ComponentModel.DataAnnotations;
using EmailNotificationService.Models.Options;
using EmailNotificationService.Services;
using EmailNotificationService.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


var builder = Host.CreateApplicationBuilder();

builder.Configuration.AddJsonFile("appsettings.json");

builder.Services
    .AddOptions<RabbitMqOptions>()
    .BindConfiguration(RabbitMqOptions.ConfigSectionName)
    .Validate(options => !string.IsNullOrEmpty(options.ExchangeName) && !string.IsNullOrEmpty(options.QueueName));

builder.Services
    .AddOptions<EmailOptions>()
    .BindConfiguration(EmailOptions.ConfigSectionName)
    .Validate(options => !string.IsNullOrEmpty(options.SmtpServer) && 
                         !string.IsNullOrEmpty(options.SenderAddress) && 
                         !string.IsNullOrEmpty(options.SenderPassword) &&
                         !string.IsNullOrEmpty(options.SenderName));


builder.Services.AddSingleton<IEmailSenderService, EmailSenderService>();
builder.Services.AddScoped<IUserDetailsProvider, UserDetailsProvider>();
builder.Services.AddHostedService<ConsumerService>();

var app = builder.Build();
app.Run();



