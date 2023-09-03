using FluentValidation;

namespace AdvertisingService.BusinessLogic.Models.Validators;

public class ImageValidator : AbstractValidator<Image>
{
    public ImageValidator()
    {
        RuleFor(image => image.Data)
            .NotNull()
            .NotEmpty();

        RuleFor(image => image.Advertisement)
            .NotNull();
    }
}