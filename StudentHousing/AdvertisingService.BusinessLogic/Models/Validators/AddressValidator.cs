using FluentValidation;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class AddressValidator : AbstractValidator<Address>
    {
        public AddressValidator()
        {
            RuleFor(address => address.Region)
                .NotNull().WithMessage("Region cannot be null.")
                .NotEmpty().WithMessage("Region cannot be empty.")
                .Matches("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$")
                .WithMessage("Format for Region is not allowed.")
                .MaximumLength(30).WithMessage("The length of Region must be less than 30 characters.");

            RuleFor(address => address.PostalCode)
                .NotNull().WithMessage("Postal code cannot be null.")
                .NotEmpty().WithMessage("Postal code cannot be empty.")
                .GreaterThanOrEqualTo(1000).WithMessage("Postal code must be 4 digits long.")
                .LessThanOrEqualTo(9999).WithMessage("Postal code must be 4 digits long.");

            RuleFor(address => address.City)
                .NotNull().WithMessage("City cannot be null.")
                .NotEmpty().WithMessage("City cannot be empty.")
                .Matches("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$")
                .WithMessage("Format for City is not allowed.")
                .MaximumLength(30).WithMessage("The length of City must be less than 30 characters.");

            RuleFor(address => address.District)
                .MaximumLength(20).WithMessage("The length of District must be less than 20 characters.");

            RuleFor(address => address.District)
                .NotNull().WithMessage("District cannot be null")
                .NotEmpty().WithMessage("District cannot be empty")
                .When(address => (address.City?? "")
                    .ToLower().Equals("budapest")).WithMessage("District cannot be empty for City 'Budapest'");

            RuleFor(address => address.StreetName)
                .NotNull().WithMessage("Street name cannot be null")
                .NotEmpty().WithMessage("Street name cannot be empty")
                .MaximumLength(40).WithMessage("The length of Street name must be less than 40 characters.");

            RuleFor(address => address.StreetNumber)
                .NotNull().WithMessage("Street number cannot be null")
                .NotEmpty().WithMessage("Street number cannot be empty")
                .MaximumLength(10).WithMessage("The length of Street number must be less than 10 characters.");

            RuleFor(address => address.UnitNumber)
                .MaximumLength(10).WithMessage("The length of Unit number must be less than 10 characters.");

        }
    }
}
