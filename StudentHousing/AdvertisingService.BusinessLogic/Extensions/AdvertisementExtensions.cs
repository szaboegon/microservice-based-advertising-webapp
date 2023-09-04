using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.Extensions;

public static class AdvertisementExtensions
{
    public static AdvertisementDto ToCardDto(this Advertisement advertisement)
    {
        return new AdvertisementDto
        {
            Id = advertisement.Id,
            CategoryName = advertisement.Category.Name,
            City = advertisement.Address.City,
            District = advertisement.Address.District,
            StreetName = advertisement.Address.StreetName,
            StreetNumber = advertisement.Address.StreetNumber,
            NumberOfRooms = advertisement.NumberOfRooms,
            Size = advertisement.Size,
            MonthlyPrice = advertisement.MonthlyPrice,
            UploadDate = advertisement.UploadDate,
            Image = advertisement.Images.First().Data,
        };
    }

    public static AdvertisementDetailsDto ToDetailsDto(this Advertisement advertisement)
    {
        return new AdvertisementDetailsDto
        {
            Id = advertisement.Id,
            CategoryName = advertisement.Category.Name,
            Region = advertisement.Address.Region,
            PostalCode = advertisement.Address.PostalCode,
            City = advertisement.Address.City,
            District = advertisement.Address.District,
            StreetName = advertisement.Address.StreetName,
            StreetNumber = advertisement.Address.StreetNumber,
            UnitNumber = advertisement.Address.UnitNumber,
            NumberOfRooms = advertisement.NumberOfRooms,
            Size = advertisement.Size,
            Furnished = advertisement.Furnished,
            Parking = advertisement.Parking,
            Description = advertisement.Description,
            MonthlyPrice = advertisement.MonthlyPrice,
            Image = advertisement.Images.First().Data,
            AdvertiserId = advertisement.AdvertiserId

        };
    }
}