using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services;

public class AdvertisementService
{
    private readonly IAdvertisementRepository _advertisementRepository;
    private readonly AddressService _addressService;
    private readonly CategoryService _categoryService;
    private readonly IPipeLineBuilder<Advertisement, AdvertisementCardDTO> _pipeLineBuilder;

    private readonly IValidator<Advertisement> _advertisementValidator;
    public AdvertisementService(IAdvertisementRepository advertisementRepository,
        AddressService addressService, CategoryService categoryService,
        IValidator<Advertisement> advertisementValidator, IPipeLineBuilder<Advertisement, AdvertisementCardDTO> pipeLineBuilder)
    {
        _advertisementRepository = advertisementRepository;
        _addressService = addressService;
        _categoryService = categoryService;
        _advertisementValidator = advertisementValidator;
        _pipeLineBuilder = pipeLineBuilder; 
    }

    public async Task<int> CreateNewAdvertisementAsync(AdvertisementDetailsDTO data, int advertiserId)
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
            AdvertiserId = advertiserId,
            Category = newCategory,
            Address = newAddress,
            UploadDate = DateTime.Now
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

    public async Task DeleteAdvertisementAsync(int advertisementId, int advertiserId)   
    {
        var advertisement = await _advertisementRepository.GetByIdAsync(advertisementId);
        if (advertisement == null)
        {
            throw new Exception("Advertisement with this id does not exist");
        }

        if (advertisement.AdvertiserId != advertiserId)
        {
            throw new Exception("Advertisement does not belong to this advertiser");
        }
        _advertisementRepository.Remove(advertisement);
        await _advertisementRepository.SaveAsync();
    }

    public async Task<IEnumerable<AdvertisementCardDTO>> GetAdvertisementsByUserAsync(int advertiserId)
    {
        var result = await _advertisementRepository.GetByAdvertiserIdAsync(advertiserId);

        return result;
    }

    public async Task<IEnumerable<AdvertisementCardDTO>> GetLatestAdvertisementsAsync(int count)
    {
        if (count < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(count));
        }
        var result = await _advertisementRepository.GetLatestAdvertisementsAsync(count);
        return result;
    }
}