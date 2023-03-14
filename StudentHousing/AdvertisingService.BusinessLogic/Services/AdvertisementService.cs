using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using System.Transactions;

namespace AdvertisingService.BusinessLogic.Services
{
    public class AdvertisementService
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IImageRepository _imageRepository;
        public AdvertisementService(IAdvertisementRepository advertisementRepository, IAddressRepository addressRepository, ICategoryRepository categoryRepository, IImageRepository imageRepository)
        {
            _advertisementRepository = advertisementRepository;
            _addressRepository = addressRepository;
            _categoryRepository = categoryRepository;
            _imageRepository = imageRepository;
        }


        public async Task<int> CreateNewAdvertisement(NewAdvertisementDTO data) //TODO make it async
        {
            
                if (data == null) throw new Exception("Data is null!");
                if (data.CategoryName == null) throw new Exception("Category name is null!");
                if (data.CategoryName.ToUpper() != "APARTMENT" && data.CategoryName.ToUpper() != "ROOM" && data.CategoryName.ToUpper() != "HOUSE") throw new Exception("Invalid category!");

                var newCategory = await _categoryRepository.FindByNameAsync(data.CategoryName);

                if (newCategory == null)
                {
                    newCategory = new Category()
                    {
                        Name = data.CategoryName,
                    };
                    await _categoryRepository.AddAsync(newCategory);
                }

                if (data.Region == null || data.PostalCode <= 0 || data.City == null
                    || data.StreetName == null || data.StreetNumber == null || data.UnitNumber == null) throw new Exception("A part of the address is null!");

                if (data.PostalCode < 1000 || data.PostalCode > 9999) throw new Exception("Invalid postal code!");

                if (data.City.ToUpper() == "BUDAPEST" && data.District == null) throw new Exception("District required!");

                if (data.City.ToUpper() != "BUDAPEST") data.District = null;

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

                //if( data.NumberOfRooms<=0 || data.Size<=0 || data.monthlyPrice<=0 ||)

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

                var newImage = new Image()
                {
                    Data = data.Image,
                    Advertisement = newAdvertisement
                };

                await _addressRepository.AddAsync(newAddress);
                await _advertisementRepository.AddAsync(newAdvertisement);
                //_imageRepository.Add(newImage);

                await _advertisementRepository.SaveAsync();

                return newAdvertisement.Id;
        }

        public async Task<IEnumerable<AdvertisementCardDTO>> GetAllAdvertisements()
        {
            return await _advertisementRepository.GetAllWithCardDataAsync();
        }

        /*public void Filter()
        {

        }*/
    }
}
