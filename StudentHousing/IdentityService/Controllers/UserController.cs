using IdentityService.Models;
using IdentityService.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace IdentityService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService _userService;
        public UserController(UserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> LoginAsync([FromBody] AuthenticationRequest request)
        {
            SignInResult result;
            try
            {
                result = await _userService.LoginAsync(request);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }

            if (result.Succeeded)
            {
                return Ok();
            }
            return BadRequest("Wrong username or password.");
            
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
                return Ok();
            }
            
            return BadRequest(result.Errors.First().Description);
            
        }
    }
}
