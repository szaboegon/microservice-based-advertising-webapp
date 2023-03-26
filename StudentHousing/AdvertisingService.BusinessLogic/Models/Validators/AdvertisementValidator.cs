using FluentValidation;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class AdvertisementValidator : AbstractValidator<Advertisement>
    {
        public AdvertisementValidator()
        {
            RuleFor(advertisement => advertisement.NumberOfRooms).NotNull().GreaterThanOrEqualTo(1)
                .Must(numberOfRooms=>numberOfRooms%0.5==0).WithMessage("Number of Rooms must be a multiple of 0.5");

            RuleFor(advertisement => advertisement.Size).NotNull().NotEmpty().GreaterThanOrEqualTo(1);

            RuleFor(advertisement=>advertisement.MonthlyPrice).NotNull().NotEmpty().GreaterThanOrEqualTo(0);

            RuleFor(advertisement => advertisement.Description).NotNull().NotEmpty().MaximumLength(1000);

            RuleFor(advertisement => advertisement.Category).NotNull();

            RuleFor(advertisement => advertisement.Address).NotNull();

        }
    }
}
