using FluentValidation;
using IdentityService.Dtos;
using IdentityService.Extensions;
using IdentityService.Models;
using IdentityService.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace IdentityService.Controllers;

[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly ILogger<UserController> _logger;
    public UserController(IUserService userService, ILogger<UserController> logger)
    {
        _userService = userService;
        _logger = logger;
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login([FromBody] AuthenticationRequest request)
    {
        _logger.LogInformation("Incoming login request for user: {UserName}", request.UserName);
        try
        {
            var tokens = await _userService.LoginAsync(request);

            if (tokens == null)
            {
                _logger.LogWarning("Login attempt failed for user: {UserName}", request.UserName);
                return Unauthorized("Wrong username or password.");
            }

            return Ok(tokens);
        }
        catch(ValidationException ex)
        {
            _logger.LogWarning("A validation exception occurred while checking login request: {Exception}", ex);
            return BadRequest(ex.Message);
        }
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> Register([FromBody] RegistrationRequestDto request)
    {
        _logger.LogInformation("Incoming registration request with user name: {UserName}", request.UserName);
        try
        {
            var result = await _userService.RegisterAsync(request);

            if (result.Succeeded)
            {
                return Ok("Registration was successful.");
            }

            return BadRequest(result.Errors.First().Description);
        }
        catch(ValidationException ex)
        {
            _logger.LogWarning("A validation exception occurred while checking registration request: {Exception}", ex);
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("auth")]
    [Authorize]
    public ActionResult Auth()
    {
        return Ok();
    }

    [HttpPost]
    [Route("refresh_token")]
    public async Task<ActionResult> RefreshToken([FromBody] TokenExchangeDto request)
    {
        try
        {
            var refreshedTokens = await _userService.RefreshTokenAsync(request);
            return Ok(refreshedTokens);
        }
        catch (SecurityTokenException ex)
        {
            _logger.LogWarning("Security token refresh failed: {Exception}", ex);
            return Unauthorized("Token expired");
        }
    }

    [HttpGet]
    [Route("user_details/{id}")]
    public async Task<ActionResult<List<AppUserDto>>> GetUserDetails(int id)
    {
        _logger.LogInformation("Getting user by id: {UserId}",id);
        var userDetails = await _userService.GetUserByIdAsync(id);
        if (userDetails == null)
        {
            _logger.LogWarning("Get user by id: {Id} NOT FOUND", id);
            return NotFound();
        }

        return Ok(userDetails);
    }

    [HttpGet]
    [Route("multiple_user_details")]
    public async Task<ActionResult<List<AppUserDto>>> GetMultipleUserDetails([FromQuery] List<int> id)
    {
        _logger.LogInformation("Getting multiple users by Id: {UserId}", id);
        var result = new List<AppUserDto>();
        foreach (var userId in id)
        {
            var userDetails = await _userService.GetUserByIdAsync(userId);
            if (userDetails == null)
            {
                _logger.LogWarning("Get user by id: {UserId} NOT FOUND", id);
                return NotFound($"User with id: {userId} does not exist");
            }

            result.Add(userDetails.ToDto());
        }

        return Ok(result);
    }
}