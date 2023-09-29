using MessagingService.DAL;
using MessagingService.Helpers;
using MessagingService.Hubs;
using MessagingService.Models.Options;
using MessagingService.Repositories;
using MessagingService.Repositories.Interfaces;
using MessagingService.Services;
using MessagingService.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = ConnectionHandler.GetMessageDbConnectionString();
builder.Services.AddDbContext<MessageDbContext>(options =>
    options.UseSqlServer(connectionString));

// Options 
builder.Services
    .AddOptions<RabbitMqOptions>()
    .Bind(builder.Configuration.GetSection(RabbitMqOptions.ConfigSectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

// Repositories
builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IPrivateChatRepository, PrivateChatRepository>();

// Services
builder.Services.AddScoped<IMessageService, MessageService>();
//builder.Services.AddScoped<IAuthChecker, AuthChecker>();
builder.Services.AddSingleton<IMessageProducer, MessageProducer>();

//Helpers
builder.Services.AddSingleton<JwtTokenHelper, JwtTokenHelper>();

builder.Services.AddControllers();
builder.Services.AddSignalR();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<MessageDbContext>();
    db.Database.Migrate();
}

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseRouting();
//app.UseCors("CorsPolicy");
app.UseAuthorization();

app.MapHub<MessageHub>("/hubs/message");
app.MapControllers();


app.Run();
