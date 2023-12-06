using FluentValidation;

namespace IdentityService.Models.Validators;

public class RegistrationRequestValidator : AbstractValidator<RegistrationRequest>
{
    public RegistrationRequestValidator()
    {
        RuleFor(request => request.FirstName)
            .NotNull().WithMessage("First name cannot be null.")
            .NotEmpty().WithMessage("First name cannot be empty.")
            .Matches("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\\s]+$").WithMessage("First name cannot contain numbers or special characters.");

        RuleFor(request => request.LastName)
            .NotNull().WithMessage("Last name cannot be null.")
            .NotEmpty().WithMessage("Last name cannot be empty.")
            .Matches("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ\\s-]+$").WithMessage("Last name cannot contain numbers or special characters.");

        RuleFor(request => request.UserName)
            .NotNull().WithMessage("User name cannot be null.")
            .NotEmpty().WithMessage("User name cannot be empty.")
            .MinimumLength(3).WithMessage("User name must be at least 3 characters long.")
            .MaximumLength(20).WithMessage("User name must be at most 20 characters long.");

        RuleFor(request => request.Password)
            .NotNull().WithMessage("Password cannot be null.")
            .NotEmpty().WithMessage("Password cannot be empty.")
            .MinimumLength(6).WithMessage("Password must be at least 6 characters long.")
            .Matches(@"[A-Z]+").WithMessage("Password must contain at least one uppercase letter.")
            .Matches(@"[a-z]+").WithMessage("Password must contain at least one lowercase letter.")
            .Matches(@"[0-9]+").WithMessage("Password must contain at least one number.");

        RuleFor(request => request.ConfirmPassword)
            .Equal(request => request.Password).WithMessage("Passwords do not match!");

        RuleFor(request => request.Email)
            .NotNull().WithMessage("Email address cannot be null.")
            .NotEmpty().WithMessage("Email address cannot be empty.");
    }
}