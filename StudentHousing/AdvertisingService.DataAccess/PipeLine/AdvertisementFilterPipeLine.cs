using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.PipeLine
{
    public class AdvertisementFilterPipeLine : PipeLineBase<Advertisement, AdvertisementCardDTO>
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        public AdvertisementFilterPipeLine(IAdvertisementRepository advertisementRepository)
        {
            _advertisementRepository = advertisementRepository;

        }
        public override async Task<IEnumerable<AdvertisementCardDTO>> PerformOperation()
        {
            var input = _advertisementRepository.GetAllAsIQueryable();
            foreach (var operation in Operations)
            {
                input = operation.Execute(input);
            }

            return await input.Select(a => new AdvertisementCardDTO
            {
                Id = a.Id,
                CategoryName = a.Category.Name,
                City = a.Address.City,
                District = a.Address.District,
                StreetName = a.Address.StreetName,
                StreetNumber = a.Address.StreetNumber,
                NumberOfRooms = a.NumberOfRooms,
                Size = a.Size,
                MonthlyPrice = a.MonthlyPrice,
                UploadDate = a.UploadDate,
                Image = a.Images.First().Data,
            }).ToListAsync();
        }
    }
}
