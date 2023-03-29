using FluentValidation;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class AdvertisementValidator : AbstractValidator<Advertisement>
    {
        public AdvertisementValidator()
        {
            RuleFor(advertisement => advertisement.NumberOfRooms)
                .NotNull().WithMessage("Number of Rooms cannot be null")
                .GreaterThanOrEqualTo(1).WithMessage("Number of Rooms must be at least 1")
                .Must(numberOfRooms=>numberOfRooms%0.5==0).WithMessage("Number of Rooms must be a multiple of 0.5");

            RuleFor(advertisement => advertisement.Size)
                .NotNull().WithMessage("Size cannot be null.")
                .NotEmpty().WithMessage("Size cannot be empty.")
                .GreaterThanOrEqualTo(1).WithMessage("Size must be at least 1");

            RuleFor(advertisement=>advertisement.MonthlyPrice)
                .NotNull().WithMessage("Monthly price cannot be null")
                .NotEmpty().WithMessage("Monthly price cannot be empty")
                .GreaterThanOrEqualTo(0).WithMessage("Monthly price must be at least 0");

            RuleFor(advertisement => advertisement.Description)
                .NotNull().WithMessage("Description cannot be null")
                .NotEmpty().WithMessage("Description cannot be empty")
                .MaximumLength(1000).WithMessage("The length of Description must be less than 1000 characters.");

            RuleFor(advertisement => advertisement.Category)
                .NotNull().WithMessage("The Category of the Advertisement cannot be null.");

            RuleFor(advertisement => advertisement.Address)
                .NotNull().WithMessage("The Address belonging to the Advertisement cannot be null.");

        }
    }
}
