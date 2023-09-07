using MessagingService.DAL;
using MessagingService.Hubs;
using MessagingService.Repositories;
using MessagingService.Repositories.Interfaces;
using MessagingService.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var connectionString = ConnectionHandler.GetMessageDbConnectionString();
builder.Services.AddDbContext<MessageDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddScoped<IMessageRepository, MessageRepository>();
builder.Services.AddScoped<IPrivateChatRepository, PrivateChatRepository>();

builder.Services.AddScoped<MessageService, MessageService>();

/*builder.Services.AddCors(o => o.AddPolicy("CorsPolicy", builder => {
    builder
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    .WithOrigins("http://localhost:80");
}));*/

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
