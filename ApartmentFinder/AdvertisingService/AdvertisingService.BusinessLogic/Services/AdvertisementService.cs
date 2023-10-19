using AdvertisingService.BusinessLogic.Dtos;
using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.BusinessLogic.Services.Interfaces;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services;

public class AdvertisementService : IAdvertisementService
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

    public async Task<Advertisement> CreateAdvertisementAsync(AdvertisementCreateDto advertisementCreate, int advertiserId)
    {
        var newCategory = await CreateNewCategoryIfDoesNotExistAsync(advertisementCreate.CategoryName);
        var newAddress = await CreateNewAddressAsync(advertisementCreate);

        var newAdvertisement = new Advertisement()
        {
            NumberOfRooms = advertisementCreate.NumberOfRooms,
            Size = advertisementCreate.Size,
            Furnished = advertisementCreate.Furnished,
            Parking = advertisementCreate.Parking,
            MonthlyPrice = advertisementCreate.MonthlyPrice,
            Description = advertisementCreate.Description,
            AdvertiserId = advertiserId,
            Category = newCategory,
            Address = newAddress,
            UploadDate = DateTime.Now
        };

        await _advertisementValidator.ValidateAndThrowAsync(newAdvertisement);
   
        await _advertisementRepository.Add(newAdvertisement);
        return newAdvertisement;
    }

    public async Task<IPagedList<Advertisement>> GetAdvertisementsByQueryAsync(QueryParamsRequestDto queryParams)
    {
        var advertisements = await _advertisementRepository.GetByQuery(queryParams);
        return advertisements;
    }

    public async Task<Advertisement?> GetAdvertisementDetailsAsync(int id)
    {
        var advertisement= await _advertisementRepository.Get(id);
        return advertisement;
    }

    public async Task<Advertisement?> DeleteAdvertisementAsync(int advertisementId, int advertiserId)   
    {
        var advertisement = await _advertisementRepository.Get(advertisementId);
        if (advertisement == null)
        {
            return null;
        }

        if (advertisement.AdvertiserId != advertiserId)
        {
            throw new ValidationException("Advertisement does not belong to this advertiser");
        }
        _advertisementRepository.Remove(advertisement);
        return advertisement;
    }

    public async Task<IEnumerable<Advertisement>> GetAdvertisementsByUserAsync(int advertiserId)
    {
        var result = await _advertisementRepository.GetByAdvertiserId(advertiserId);
        return result;
    }

    public async Task<IEnumerable<Advertisement>> GetLatestAdvertisementsAsync(int count)
    {
        if (count < 0)
        {
            throw new ArgumentOutOfRangeException($"{nameof(count)} must be bigger than 0.");
        }
        var result = await _advertisementRepository.GetLatest(count);
        return result;
    }

    private async Task<Address> CreateNewAddressAsync(AdvertisementCreateDto advertisementCreate)
    {
        var newAddress = new Address()
        {
            Region = advertisementCreate.Region,
            PostalCode = advertisementCreate.PostalCode,
            City = advertisementCreate.City,
            District = advertisementCreate.District,
            StreetName = advertisementCreate.StreetName,
            StreetNumber = advertisementCreate.StreetNumber,
            UnitNumber = advertisementCreate.UnitNumber,
        };

        await _addressValidator.ValidateAndThrowAsync(newAddress);
        return newAddress;
    }

    private async Task<Category> CreateNewCategoryIfDoesNotExistAsync(string? categoryName)
    {
        if (categoryName == null)
        {
            throw new ValidationException($"{nameof(categoryName)} cannot be null.");
        }

        var newCategory = await _categoryRepository.GetByName(categoryName);

        if (newCategory != null)
        {
            return newCategory;
        }

        newCategory = new Category()
        {
            Name = categoryName,
        };

        await _categoryValidator.ValidateAndThrowAsync(newCategory);
        return newCategory;
    }
}