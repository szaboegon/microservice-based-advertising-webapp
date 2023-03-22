using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;

namespace AdvertisingService.BusinessLogic.Models.Validators
{
    public class ImageValidator : AbstractValidator<Image>
    {
        public ImageValidator()
        {
            RuleFor(image => image.Data).NotNull().NotEmpty();

            RuleFor(image => image.Advertisement).NotNull();
        }
    }
}
