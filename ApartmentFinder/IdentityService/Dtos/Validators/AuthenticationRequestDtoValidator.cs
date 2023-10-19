using FluentValidation;

namespace IdentityService.Dtos.Validators;

public class AuthenticationRequestDtoValidator : AbstractValidator<AuthenticationRequestDto>
{
    public AuthenticationRequestDtoValidator()
    {
        RuleFor(request => request.UserName)
            .NotNull().WithMessage("User name must not be null.")
            .NotEmpty().WithMessage("User name must not be empty.");
        RuleFor(request => request.Password)
            .NotNull().WithMessage("Password must not be null.")
            .NotEmpty().WithMessage("Password must not be empty.");

    }
}