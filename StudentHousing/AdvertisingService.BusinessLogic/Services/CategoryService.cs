using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.Models.Validators;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services
{
    public class CategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly IValidator<Category> _categoryValidator;
        public CategoryService(ICategoryRepository categoryRepository, IValidator<Category> categoryValidator)
        {
            _categoryRepository = categoryRepository;
            _categoryValidator = categoryValidator;
        }

        public async Task<Category> CreateNewCategoryIfDoesNotExistAsync(string? categoryName)
        {
            if(categoryName==null)
                throw new ArgumentNullException(nameof(categoryName));

            var newCategory = await _categoryRepository.GetByNameAsync(categoryName);

            if (newCategory != null)
                return newCategory;

            newCategory = new Category()
            {
                Name = categoryName,
            };

            var validationResult = await _categoryValidator.ValidateAsync(newCategory);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    throw new ValidationException(error.ErrorMessage);
                }
            }

            await _categoryRepository.AddAsync(newCategory);
            return newCategory;
        }
    }
}
