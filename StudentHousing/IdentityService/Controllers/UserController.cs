﻿using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Azure;
using IdentityService.Models;
using IdentityService.Services;
using Microsoft.AspNetCore.Authorization;
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
        [Route("user_details/{id:int}")]
        [Authorize]
        public async Task<ActionResult<UserDetailsDTO>> ValidateToken(int id)
        {
            try
            {
                var result = await _userService.GetUserDetailsByIdAsync(id);
                return Ok(result);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
