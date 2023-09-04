using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.Models.Validators;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.DataAccess.Data;
using AdvertisingService.DataAccess.PipeLine;
using AdvertisingService.DataAccess.Repositories;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

// Add Database Context dependency injection

var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
var dbName = Environment.GetEnvironmentVariable("DB_NAME");
var dbPassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");

var connectionString = $"Data Source={dbHost};Initial Catalog={dbName};User ID=sa;Password={dbPassword};TrustServerCertificate=true";
builder.Services.AddDbContext<AdvertisementDbContext>(opt => opt.UseSqlServer(connectionString));


// Repositories
builder.Services.AddScoped<IAdvertisementRepository, AdvertisementRepository>();
builder.Services.AddScoped<IAddressRepository, AddressRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IImageRepository, ImageRepository>();

// Services
builder.Services.AddScoped<AdvertisementService, AdvertisementService>();
builder.Services.AddScoped<AddressService, AddressService>();
builder.Services.AddScoped<CategoryService, CategoryService>();
builder.Services.AddScoped<ImageService, ImageService>();

// Validators
builder.Services.AddScoped<IValidator<Address>, AddressValidator>();
builder.Services.AddScoped<IValidator<Advertisement>, AdvertisementValidator>();
builder.Services.AddScoped<IValidator<Category>, CategoryValidator>();
builder.Services.AddScoped<IValidator<Image>, ImageValidator>();

builder.Services.AddScoped<IPipeLineBuilder<Advertisement, AdvertisementDto>, AdvertisementFilterPipeLineBuilder>(); //TODO

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
    db.Database.Migrate();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
