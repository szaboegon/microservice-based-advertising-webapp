using FluentValidation;
using IdentityService.DataTransferObjects;
using IdentityService.Models;
using IdentityService.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

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
    public async Task<ActionResult> LoginAsync([FromBody] AuthenticationRequest request)
    {
        try
        {
            var response = await _userService.LoginAsync(request);

            if (response.SignInResult != SignInResult.Success)
            {
                return Unauthorized(response.Message);
            }

            return Ok(new
            {
                response.Message,
                response.UserName,
                response.Token
            });
        }
        catch(ValidationException e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> RegisterAsync([FromBody] RegistrationRequest request)
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
    public ActionResult ValidateToken()
    {
        return Ok();
    }

    [HttpGet]
    [Route("user_details/{id}")]
    public async Task<ActionResult<List<AppUserDto>>> GetUserDetailsAsync(int id)
    {
        var userDetails = await _userService.GetUserDetailsByIdAsync(id);
        if (userDetails == null)
        {
            return NotFound();
        }

        return Ok(userDetails);
    }

    [HttpGet]
    [Route("multiple_user_details")]
    public async Task<ActionResult<List<AppUserDto>>> GetMultipleUserDetailsAsync([FromQuery] List<int> id)
    {
        var result = new List<AppUserDto>();
        foreach (var userId in id)
        {
            var userDetails = await _userService.GetUserDetailsByIdAsync(userId);
            if (userDetails == null)
            {
                return NotFound($"User with id: {userId} does not exist");
            }

            result.Add(userDetails);
        }

        return Ok(result);
    }
}