using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.Models.Validators;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.BusinessLogic.Services.Filters;
using AdvertisingService.BusinessLogic.Services.PipeLine;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services
{
    public class AdvertisementService
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly AddressService _addressService;
        private readonly CategoryService _categoryService;

        private readonly IValidator<Advertisement> _advertisementValidator;
        public AdvertisementService(IAdvertisementRepository advertisementRepository,
            AddressService addressService, CategoryService categoryService, IValidator<Advertisement> advertisementValidator)
        {
            _advertisementRepository = advertisementRepository;
            _addressService = addressService;
            _categoryService = categoryService;
            _advertisementValidator = advertisementValidator;
        }

        public async Task<int> CreateNewAdvertisementAsync(AdvertisementDetailsDTO data)
        {
            var newCategory = await _categoryService.CreateNewCategoryIfDoesNotExistAsync(data.CategoryName);
            var newAddress = await _addressService.CreateNewAddressAsync(data);

            var newAdvertisement = new Advertisement()
            {
                NumberOfRooms = data.NumberOfRooms,
                Size = data.Size,
                Furnished = data.Furnished,
                Parking = data.Parking,
                MonthlyPrice = data.MonthlyPrice,
                Description = data.Description,
                AdvertiserId = 10000,
                Category = newCategory,
                Address = newAddress,
            };

            var validationResult = await _advertisementValidator.ValidateAsync(newAdvertisement);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    throw new ValidationException(error.ErrorMessage);
                }
            }

            await _advertisementRepository.AddAsync(newAdvertisement);
            await _advertisementRepository.SaveAsync();
            return newAdvertisement.Id;
        }

        public async Task<IEnumerable<AdvertisementCardDTO>> GetAllAdvertisementsAsync(QueryParamsDTO queryParams)
        {
            var result=await _advertisementRepository.GetAllWithCardDataAsync();

            var pipeLine = new AdvertisementFilterPipeLine();
            pipeLine
                .Register(new FilterByCategory(queryParams.CategoryName))
                .Register(new FilterByCity(queryParams.City))
                .Register(new FilterByNumberOfRooms(queryParams.NumberOfRooms))
                .Register(new FilterBySize(queryParams.MinSize, queryParams.MaxSize))
                .Register(new FilterByMonthlyPrice(queryParams.MinMonthlyPrice, queryParams.MaxMonthlyPrice))
                .Register(new FilterByFurnished(queryParams.Furnished))
                .Register(new FilterByParking(queryParams.Parking));

            return pipeLine.PerformOperation(result);
        }

        public async Task<AdvertisementDetailsDTO> GetAdvertisementDetailsAsync(int id)
        {
            var advertisement= await _advertisementRepository.GetByIdWithDetailsAsync(id);
            if (advertisement == null) throw new Exception("Advertisement with this id does not exist");

            return advertisement;
        }
    }
}
