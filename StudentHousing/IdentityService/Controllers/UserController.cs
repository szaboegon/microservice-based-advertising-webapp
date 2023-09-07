using IdentityService.DataTransferObjects;
using IdentityService.Models;
using IdentityService.Services;
using IdentityService.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
        AuthenticationResponse response;
        try
        {
            response = await _userService.LoginAsync(request);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

        if (response.SignInResult != SignInResult.Success)
        {
            return BadRequest(response.Message);
        }
           
        return Ok(new
        {
            response.Message,
            response.UserName,
            response.Token
        });
    }

    [HttpPost]
    [Route("register")]
    public async Task<ActionResult> RegisterAsync([FromBody] RegistrationRequest request)
    {
        IdentityResult result;
        try
        {
            result = await _userService.RegisterAsync(request);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }

        if (result.Succeeded)
        {
            return Ok("Registration was successful.");
        }
            
        return BadRequest(result.Errors.First().Description);
    }

    [HttpGet]
    [Route("auth")]
    [Authorize]
    public ActionResult ValidateToken()
    {
        return Ok();
    }

    [HttpGet]
    [Route("user_details")]
    public async Task<ActionResult<List<AppUserDto>>> GetUserDetailsAsync([FromQuery] List<int> id)
    {
        try
        {
            var result = new List<AppUserDto>();
            foreach (var userId in id)
            {
                var userDetails = await _userService.GetUserDetailsByIdAsync(userId);
                result.Add(userDetails);
            }
            return Ok(result);
        }
        catch(Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}