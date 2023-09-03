using FluentValidation;

namespace IdentityService.Models.Validators;

public class AuthenticationRequestValidator : AbstractValidator<AuthenticationRequest>
{
    public AuthenticationRequestValidator()
    {
        RuleFor(request => request.UserName)
            .NotNull().WithMessage("User name must not be null.")
            .NotEmpty().WithMessage("User name must not be empty.");
        RuleFor(request => request.Password)
            .NotNull().WithMessage("Password must not be null.")
            .NotEmpty().WithMessage("Password must not be empty.");

    }
}