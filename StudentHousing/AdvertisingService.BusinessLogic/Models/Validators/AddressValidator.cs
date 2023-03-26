using FluentValidation;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class AddressValidator : AbstractValidator<Address>
    {
        public AddressValidator()
        {
            RuleFor(address => address.Region)
                .NotNull().NotEmpty()
                .Matches("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$")
                .MaximumLength(30);

            RuleFor(address => address.PostalCode).NotNull().NotEmpty().GreaterThanOrEqualTo(1000).LessThanOrEqualTo(9999);

            RuleFor(address => address.City).NotNull().NotEmpty().Matches("^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$|^[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+-[a-zA-ZáéíóöőúüűÁÉÍÓÖŐÚÜŰ]+$").MaximumLength(30);

            RuleFor(address => address.District).MaximumLength(20);
            RuleFor(address => address.District).NotNull().NotEmpty()
                .When(address => (address.City?? "").ToLower().Equals("budapest"));

            RuleFor(address => address.StreetName).NotNull().NotEmpty().MaximumLength(40);

            RuleFor(address => address.StreetNumber).NotNull().NotEmpty().MaximumLength(10);

            RuleFor(address => address.UnitNumber).MaximumLength(10);

        }
    }
}
