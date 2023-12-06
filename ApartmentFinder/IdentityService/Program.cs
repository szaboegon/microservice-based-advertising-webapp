using System.Text;
using ErrorHandling.Middleware;
using FluentValidation;
using IdentityService.DAL;
using IdentityService.Models;
using IdentityService.Models.Validators;
using IdentityService.Services;
using IdentityService.Services.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TokenOptions = IdentityService.Models.Options.TokenOptions;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

// Add services to the container.
var connectionString = ConnectionHandler.GetIdentityDbConnectionString();

builder.Services.AddDbContext<IdentityDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddDefaultIdentity<AppUser>().AddEntityFrameworkStores<IdentityDbContext>();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.User.RequireUniqueEmail = true;
    options.User.AllowedUserNameCharacters = "aábcdeéfghiíjklmnoóöõpqrstuúüûvwxyzAÁBCDEÉFGHIÍJKLMNOÓÖÕPQRSTUÚÜÛVWXYZ0123456789";

    options.Password.RequireDigit = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredLength = 6;

    options.Lockout.AllowedForNewUsers = false;
});

// Options
builder.Services
    .AddOptions<TokenOptions>()
    .Bind(builder.Configuration.GetSection(TokenOptions.ConfigSectionName))
    .ValidateDataAnnotations()
    .ValidateOnStart();

// Services
builder.Services.AddScoped<IUserService, UserService>();

// Validators
builder.Services.AddScoped<IValidator<AuthenticationRequest>, AuthenticationRequestValidator>();
builder.Services.AddScoped<IValidator<RegistrationRequest>, RegistrationRequestValidator>();

// Jwt provider
builder.Services.AddSingleton<ITokenProvider, TokenProvider>();

// Jwt token related configurations
builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;

}).AddJwtBearer(opt =>
{
        opt.TokenValidationParameters = new()
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = configuration["Token:AccessTokenIssuer"],
            ValidAudience = configuration["Token:AccessTokenAudience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Token:AccessTokenSecretKey"])),
            ClockSkew = TimeSpan.Zero
        };
});

builder.Services.AddAuthorization();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<IdentityDbContext>();
    if (db.Database.GetPendingMigrations().Any())
    {
        db.Database.Migrate();
    }
}

app.UseAuthentication();
app.UseRouting();
app.UseAuthorization();

app.UseGlobalExceptionHandlerMiddleware();

app.MapControllers();

app.Run();
