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
    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    [Route("login")]
    public async Task<ActionResult> Login([FromBody] AuthenticationRequestDto request)
    {
        try
        {
            var tokens = await _userService.LoginAsync(request);

            if (tokens == null)
            {
                return Unauthorized("Wrong username or password.");
            }

            return Ok(tokens);
        }
        catch(ValidationException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> Register([FromBody] RegistrationRequestDto request)
    {
        try
        {
            var result = await _userService.RegisterAsync(request);

            if (result.Succeeded)
            {
                return Ok("Registration was successful.");
            }

            return BadRequest(result.Errors.First().Description);
        }
        catch(ValidationException e)
        {
            return BadRequest(e.Message);
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
        catch (SecurityTokenException)
        {
            return Unauthorized("Token expired");
        }
    }

    [HttpGet]
    [Route("user_details/{id}")]
    public async Task<ActionResult<List<AppUserDto>>> GetUserDetails(int id)
    {
        var userDetails = await _userService.GetUserByIdAsync(id);
        if (userDetails == null)
        {
            return NotFound();
        }

        return Ok(userDetails);
    }

    [HttpGet]
    [Route("multiple_user_details")]
    public async Task<ActionResult<List<AppUserDto>>> GetMultipleUserDetails([FromQuery] List<int> id)
    {
        var result = new List<AppUserDto>();
        foreach (var userId in id)
        {
            var userDetails = await _userService.GetUserByIdAsync(userId);
            if (userDetails == null)
            {
                return NotFound($"User with id: {userId} does not exist");
            }

            result.Add(userDetails.ToDto());
        }

        return Ok(result);
    }
}