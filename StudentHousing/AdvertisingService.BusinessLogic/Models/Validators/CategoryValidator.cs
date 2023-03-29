using FluentValidation;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(category => category.Name)
                .NotNull()
                .NotEmpty()
                .Must(name=>(name ?? "").ToLower()=="apartment" || (name ?? "")
                    .ToLower() == "house" || (name ?? "").ToLower() == "room").WithMessage("Allowed Categories are House, Apartment and Room");
        }
    }
}
