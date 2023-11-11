using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.WebAPI.Dtos;

namespace AdvertisingService.WebAPI.Extensions;

public static class AdvertisementExtensions
{
    public static AdvertisementInfoDto ToDto(this AdvertisementInfo advertisement)
    {
        return new AdvertisementInfoDto
        {
            Id = advertisement.Id,
            CategoryName = advertisement.CategoryName,
            City = advertisement.City,
            District = advertisement.District,
            StreetName = advertisement.StreetName,
            StreetNumber = advertisement.StreetNumber,
            NumberOfRooms = advertisement.NumberOfRooms,
            Size = advertisement.Size,
            MonthlyPrice = advertisement.MonthlyPrice,
            UploadDate = advertisement.UploadDate,
            Image = advertisement.Image, //use First
        };
    }

    public static AdvertisementDetailsDto ToDto(this AdvertisementDetails advertisement)
    {
        return new AdvertisementDetailsDto
        {
            Id = advertisement.Id,
            CategoryName = advertisement.CategoryName,
            Region = advertisement.Region,
            PostalCode = advertisement.PostalCode,
            City = advertisement.City,
            District = advertisement.District,
            StreetName = advertisement.StreetName,
            StreetNumber = advertisement.StreetNumber,
            UnitNumber = advertisement.UnitNumber,
            NumberOfRooms = advertisement.NumberOfRooms,
            Size = advertisement.Size,
            Furnished = advertisement.Furnished,
            Parking = advertisement.Parking,
            Description = advertisement.Description,
            MonthlyPrice = advertisement.MonthlyPrice,
            Images = advertisement.Images, 
            AdvertiserId = advertisement.AdvertiserId
        };
    }
}