using FluentValidation;
using IdentityService.Models;
using Microsoft.AspNetCore.Identity;

namespace IdentityService.Services
{
    public class UserService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IValidator<AuthenticationRequest> _authenticationRequestValidator;
        private readonly IValidator<RegistrationRequest> _registrationRequestValidator;

        public UserService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager,
            IValidator<AuthenticationRequest> authenticationRequestValidator, IValidator<RegistrationRequest> registrationRequestValidator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _authenticationRequestValidator = authenticationRequestValidator;
            _registrationRequestValidator = registrationRequestValidator;
        }

        public async Task<SignInResult> LoginAsync(AuthenticationRequest request)
        {
            var validationResult = await _authenticationRequestValidator.ValidateAsync(request);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    throw new ValidationException(error.ErrorMessage);
                }
            }
            var user = await _userManager.FindByNameAsync(request.UserName!);
            if (user == null)
            {
                return SignInResult.Failed;
            }

            return await _signInManager.CheckPasswordSignInAsync(user, request.Password!, false);
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
            var user = new ApplicationUser
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                UserName = request.UserName,
                Email = request.Email,
            };

            return await _userManager.CreateAsync(user, request.Password!);
        }
    }
}
