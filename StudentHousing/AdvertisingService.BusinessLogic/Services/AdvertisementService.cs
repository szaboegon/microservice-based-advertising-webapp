using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Extensions;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services;

public class AdvertisementService
{
    private readonly IAdvertisementRepository _advertisementRepository;
    private readonly IAddressRepository _addressRepository;
    private readonly ICategoryRepository _categoryRepository;

    private readonly IValidator<Advertisement> _advertisementValidator;
    private readonly IValidator<Address> _addressValidator;
    private readonly IValidator<Category> _categoryValidator;

    public AdvertisementService(
        IAdvertisementRepository advertisementRepository,
        IAddressRepository addressRepository,
        ICategoryRepository categoryRepository,
        IValidator<Advertisement> advertisementValidator,
        IValidator<Address> addressValidator,
        IValidator<Category> categoryValidator)
    {
        _advertisementRepository = advertisementRepository;
        _advertisementValidator = advertisementValidator;
        _addressRepository = addressRepository;
        _categoryRepository = categoryRepository;
        _addressValidator = addressValidator;
        _categoryValidator = categoryValidator;
    }

    public async Task<int> CreateNewAdvertisementAsync(AdvertisementDetailsDto data, int advertiserId)
    {
        var newCategory = await CreateNewCategoryIfDoesNotExistAsync(data.CategoryName);
        var newAddress = await CreateNewAddressAsync(data);

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

        await _advertisementRepository.Add(newAdvertisement);
        return newAdvertisement.Id;
    }

    public async Task<IEnumerable<AdvertisementDto>> GetAllAdvertisementsAsync(QueryParamsDto queryParams)
    {
        var advertisements = await _advertisementRepository.GetByQuery(queryParams);

        return advertisements.Select(a => a.ToDto());
    }

    public async Task<AdvertisementDetailsDto> GetAdvertisementDetailsAsync(int id)
    {
        var advertisement= await _advertisementRepository.Get(id);
        if (advertisement == null) throw new Exception("Advertisement with this id does not exist");

        return advertisement.ToDetailsDto();
    }

    public async Task DeleteAdvertisementAsync(int advertisementId, int advertiserId)   
    {
        var advertisement = await _advertisementRepository.Get(advertisementId);
        if (advertisement == null)
        {
            throw new Exception("Advertisement with this id does not exist");
        }

        if (advertisement.AdvertiserId != advertiserId)
        {
            throw new Exception("Advertisement does not belong to this advertiser");
        }
        _advertisementRepository.Remove(advertisement);
    }

    public async Task<IEnumerable<AdvertisementDto>> GetAdvertisementsByUserAsync(int advertiserId)
    {
        var result = await _advertisementRepository.GetByAdvertiserId(advertiserId);

        return result.Select(a => a.ToDto());
    }

    public async Task<IEnumerable<AdvertisementDto>> GetLatestAdvertisementsAsync(int count)
    {
        if (count < 0)
        {
            throw new ArgumentOutOfRangeException(nameof(count));
        }
        var result = await _advertisementRepository.GetLatest(count);
        return result.Select(a => a.ToDto());
    }

    private async Task<Address> CreateNewAddressAsync(AdvertisementDetailsDto data)
    {
        var newAddress = new Address()
        {
            Region = data.Region,
            PostalCode = data.PostalCode,
            City = data.City,
            District = data.District,
            StreetName = data.StreetName,
            StreetNumber = data.StreetNumber,
            UnitNumber = data.UnitNumber,
        };

        var validationResult = await _addressValidator.ValidateAsync(newAddress);
        if (!validationResult.IsValid)
        {
            foreach (var error in validationResult.Errors)
            {
                throw new ValidationException(error.ErrorMessage);
            }
        }
        return newAddress;
    }

    private async Task<Category> CreateNewCategoryIfDoesNotExistAsync(string? categoryName)
    {
        if (categoryName == null)
            throw new ArgumentNullException(nameof(categoryName));

        var newCategory = await _categoryRepository.GetByName(categoryName);

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
        return newCategory;
    }
}