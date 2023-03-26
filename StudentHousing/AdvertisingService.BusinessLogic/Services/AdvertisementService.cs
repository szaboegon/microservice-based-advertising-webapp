using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services
{
    public class AdvertisementService
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly AddressService _addressService;
        private readonly CategoryService _categoryService;
        private readonly IPipeLineBuilder<AdvertisementCardDTO> _pipeLineBuilder;

        private readonly IValidator<Advertisement> _advertisementValidator;
        public AdvertisementService(IAdvertisementRepository advertisementRepository,
            AddressService addressService, CategoryService categoryService,
            IValidator<Advertisement> advertisementValidator, IPipeLineBuilder<AdvertisementCardDTO> pipeLineBuilder)
        {
            _advertisementRepository = advertisementRepository;
            _addressService = addressService;
            _categoryService = categoryService;
            _advertisementValidator = advertisementValidator;
            _pipeLineBuilder = pipeLineBuilder; 
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
            var pipeLine = _pipeLineBuilder.Build(queryParams);
            var result =await pipeLine.PerformOperation();

            return result;
        }

        public async Task<AdvertisementDetailsDTO> GetAdvertisementDetailsAsync(int id)
        {
            var advertisement= await _advertisementRepository.GetByIdWithDetailsAsync(id);
            if (advertisement == null) throw new Exception("Advertisement with this id does not exist");

            return advertisement;
        }
    }
}
