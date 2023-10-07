using AdvertisingService.BusinessLogic.Dtos;
using AdvertisingService.BusinessLogic.Extensions;
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

    public async Task<Advertisement> CreateAdvertisementAsync(AdvertisementCreate advertisementCreate, int advertiserId)
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

    public async Task<PagedQueryResponse<AdvertisementDto>> GetAdvertisementsByQueryAsync(QueryParamsDto queryParams)
    {
        var advertisements = await _advertisementRepository.GetByQuery(queryParams);
        return new PagedQueryResponse<AdvertisementDto>(advertisements.Items.Select(a => a.ToDto()).ToList(), advertisements.CurrentPage,
            advertisements.TotalPages, advertisements.PageItemCount, advertisements.TotalItemCount);
    }

    public async Task<AdvertisementDetailsDto?> GetAdvertisementDetailsAsync(int id)
    {
        var advertisement= await _advertisementRepository.Get(id);
        return advertisement?.ToDetailsDto();
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

    public async Task<IEnumerable<AdvertisementDto>> GetAdvertisementsByUserAsync(int advertiserId)
    {
        var result = await _advertisementRepository.GetByAdvertiserId(advertiserId);

        return result.Select(a => a.ToDto());
    }

    public async Task<IEnumerable<AdvertisementDto>> GetLatestAdvertisementsAsync(int count)
    {
        if (count < 0)
        {
            throw new ArgumentOutOfRangeException($"{nameof(count)} must be bigger than 0.");
        }
        var result = await _advertisementRepository.GetLatest(count);
        return result.Select(a => a.ToDto());
    }

    private async Task<Address> CreateNewAddressAsync(AdvertisementCreate advertisementCreate)
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