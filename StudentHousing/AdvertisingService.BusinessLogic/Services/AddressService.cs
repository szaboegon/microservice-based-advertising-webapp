using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;

namespace AdvertisingService.BusinessLogic.Services;

public class AddressService
{
    private readonly IAddressRepository _addressRepository;
    private readonly IValidator<Address> _addressValidator;

    public AddressService(IAddressRepository addressRepository, IValidator<Address> addressValidator)
    {
        _addressRepository = addressRepository;
        _addressValidator = addressValidator;
    }

    public async Task<Address> CreateNewAddressAsync(AdvertisementDetailsDto data)
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
        await _addressRepository.AddAsync(newAddress);
        return newAddress;
    }
}