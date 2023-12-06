using FluentValidation;
using IdentityService.Dtos;
using IdentityService.Models;
using IdentityService.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using TokenOptions = IdentityService.Models.Options.TokenOptions;

namespace IdentityService.Services;

public class UserService : IUserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IValidator<AuthenticationRequest> _authenticationRequestValidator;
    private readonly IValidator<RegistrationRequest> _registrationRequestValidator;
    private readonly ITokenProvider _tokenProvider;
    private readonly TokenOptions _options;

    public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        IValidator<AuthenticationRequest> authenticationRequestValidator,
        IValidator<RegistrationRequest> registrationRequestValidator,
        ITokenProvider tokenProvider, IOptions<TokenOptions> options)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _authenticationRequestValidator = authenticationRequestValidator;
        _registrationRequestValidator = registrationRequestValidator;
        _tokenProvider = tokenProvider;
        _options = options.Value;
    }

    public async Task<TokenExchangeDto?> LoginAsync(AuthenticationRequest request)
    {
        await _authenticationRequestValidator.ValidateAndThrowAsync(request);

        var user = await _userManager.FindByNameAsync(request.UserName);
        if (user == null)
        {
            return null;
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!result.Succeeded)
        {
            return null;
        }

        var accessToken = _tokenProvider.GenerateAccessToken(user);
        var refreshToken = await UpdateUserRefreshTokenAsync(user);

        return new TokenExchangeDto()
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken
        };
    }

    public async Task<IdentityResult> RegisterAsync(RegistrationRequest request)
    {
        await _registrationRequestValidator.ValidateAndThrowAsync(request);
     
        var user = new AppUser()
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            UserName = request.UserName,
            Email = request.Email,
        };

        return await _userManager.CreateAsync(user, request.Password);
    }

    public async Task<AppUser?> GetUserByIdAsync(int userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString());
        return user;
    }

    public async Task<TokenExchangeDto> RefreshTokenAsync(TokenExchangeDto request)
    {
        var claimsPrincipal = _tokenProvider.GetPrincipalFromExpiredToken(request.AccessToken);

        var userName = claimsPrincipal.Claims.FirstOrDefault(claim => claim.Type == "userName")?.Value 
                       ?? throw new SecurityTokenException("Could not get user name from token");

        var user = await _userManager.FindByNameAsync(userName);

        if (user?.RefreshToken == null || user.RefreshToken != request.RefreshToken ||
            user.RefreshTokenExpiry <= DateTime.Now)
        {
            throw new SecurityTokenException("Refresh token invalid or expired.");
        }

        var newAccessToken = _tokenProvider.GenerateAccessToken(user);
        var newRefreshToken = await UpdateUserRefreshTokenAsync(user);

        return new TokenExchangeDto()
        {
            AccessToken = newAccessToken,
            RefreshToken = newRefreshToken
        };
    }

    private async Task<string> UpdateUserRefreshTokenAsync(AppUser user)
    {
        var refreshToken = _tokenProvider.GenerateRefreshToken();

        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiry = DateTime.Now.Add(_options.RefreshTokenValidityTimeSpan);

        await _userManager.UpdateAsync(user);
        return refreshToken;
    }
}