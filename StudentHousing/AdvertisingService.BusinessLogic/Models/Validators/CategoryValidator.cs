using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(category => category.Name).NotNull().NotEmpty()
                .Must(name=>(name ?? "").ToLower()=="apartment" || (name ?? "").ToLower() == "house" || (name ?? "").ToLower() == "room");
        }
    }
}
