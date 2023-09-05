using FluentValidation;
using IdentityService.DataTransferObjects;
using IdentityService.Extensions;
using IdentityService.Helpers;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services;

public class UserService
{
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IValidator<AuthenticationRequest> _authenticationRequestValidator;
    private readonly IValidator<RegistrationRequest> _registrationRequestValidator;
    private readonly JwtProvider _jwtProvider;

    public UserService(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        IValidator<AuthenticationRequest> authenticationRequestValidator, IValidator<RegistrationRequest> registrationRequestValidator, JwtProvider jwtProvider)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _authenticationRequestValidator = authenticationRequestValidator;
        _registrationRequestValidator = registrationRequestValidator;
        _jwtProvider = jwtProvider;
    }

    public async Task<AuthenticationResponse> LoginAsync(AuthenticationRequest request)
    {
        var validationResult = await _authenticationRequestValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                throw new ValidationException(error.ErrorMessage);
            }
        }
        var user = await _userManager.FindByNameAsync(request.UserName);
        if (user == null)
        {
            return new AuthenticationResponse
            {
                SignInResult = SignInResult.Failed,
                Message = "User with given name does not exist.",
                Token = null
            };
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);
        if (!result.Succeeded)
        {
            return new AuthenticationResponse
            {
                SignInResult = SignInResult.Failed,
                Message = "Wrong user name or password.",
                Token = null
            };
        }

        var token = _jwtProvider.GenerateToken(user);
        return new AuthenticationResponse
        {
            SignInResult = SignInResult.Success,
            Message = "Sign in was successful.",
            UserName = user.UserName,
            Token = token
        };
    }

    public async Task<IdentityResult> RegisterAsync(RegistrationRequest request)
    {
        var validationResult = await _registrationRequestValidator.ValidateAsync(request);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                throw new ValidationException(error.ErrorMessage);
            }
        }
        var user = new AppUser()
        {
            FirstName = request.FirstName,
            LastName = request.LastName,
            UserName = request.UserName,
            Email = request.Email,
        };

        return await _userManager.CreateAsync(user, request.Password);
    }

    public async Task<AppUserDto> GetUserDetailsByIdAsync(int userId)
    {
        var user = await _userManager.FindByIdAsync(userId.ToString()) ?? throw new KeyNotFoundException($"User with id: {userId} does not exist.");
        return user.ToDto();
    }
}