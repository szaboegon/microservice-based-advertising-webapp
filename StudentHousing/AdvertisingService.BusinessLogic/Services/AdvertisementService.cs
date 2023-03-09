using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services
{
    public class AdvertisementService
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly IAddressRepository _addressRepository;
        private readonly ICategoryRepository _categoryRepository;
        public AdvertisementService(IAdvertisementRepository advertisementRepository, IAddressRepository addressRepository, ICategoryRepository categoryRepository)
        {
            _advertisementRepository = advertisementRepository;
            _addressRepository = addressRepository;
            _categoryRepository = categoryRepository;
        }


        public bool CreateNewAdvertisement(NewAdvertisementDTO data) //TODO data conversions
        {
            var newCategory = new Category()
            {
                Name = data.Category,
            };

            var newAdvertisement = new Advertisement()
            {
                NumberOfRooms = float.Parse(data.NumberOfRooms),
                Size = float.Parse(data.Size),
                Furnished = bool.Parse(data.Furnished),
                Parking = bool.Parse(data.Parking),
                MonthlyPrice = double.Parse(data.MonthlyPrice),
                UploadDate = DateTime.Now,
                Description = data.Description,
                AdvertiserId = 10000,
                Category= newCategory,
            };

            var newAddress = new Address()
            {
                Region = data.Region,
                PostalCode = int.Parse(data.PostalCode),
                City = data.City,
                District = data.District,
                StreetName = data.StreetName,
                StreetNumber = data.StreetNumber,
                UnitNumber = data.UnitNumber,
                Advertisement=newAdvertisement,
            };

            _categoryRepository.Add(newCategory);
            _addressRepository.Add(newAddress);
            _advertisementRepository.Add(newAdvertisement);

            return true;        
        }
    }
}
