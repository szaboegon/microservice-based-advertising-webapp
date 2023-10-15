using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.Models.Validators;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.BusinessLogic.Services.Interfaces;
using AdvertisingService.DataAccess.DAL;
using AdvertisingService.DataAccess.Repositories;
using ErrorHandling.Middleware;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Add Database Context dependency injection
var connectionString = ConnectionHandler.GetAdvertisementDbConnectionString();
builder.Services.AddDbContext<AdvertisementDbContext>(opt => opt.UseSqlServer(connectionString));

// Repositories
builder.Services.AddScoped<IAdvertisementRepository, AdvertisementRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();

// Services
builder.Services.AddScoped<IAdvertisementService, AdvertisementService>();
builder.Services.AddScoped<IImageService, ImageService>();

// Validators
builder.Services.AddScoped<IValidator<Address>, AddressValidator>();
builder.Services.AddScoped<IValidator<Advertisement>, AdvertisementValidator>();
builder.Services.AddScoped<IValidator<Category>, CategoryValidator>();
builder.Services.AddScoped<IValidator<Image>, ImageValidator>();

//Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Apply database migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AdvertisementDbContext>();
    if (db.Database.GetPendingMigrations().Any())
    {
        db.Database.Migrate();
    }
}

app.UseAuthorization();

app.UseGlobalExceptionHandlerMiddleware();

app.MapControllers();

app.Run();
