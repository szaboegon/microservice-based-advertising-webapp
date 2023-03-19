using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.DataAccess.Repositories
{
    public class AdvertisementRepository : RepositoryBase<Advertisement>, IAdvertisementRepository
    {
        private readonly AdvertisementDbContext _dbcontext;
        public AdvertisementRepository(AdvertisementDbContext dbcontext) : base(dbcontext)
        {
            _dbcontext = dbcontext;
        }

        public async Task<IEnumerable<AdvertisementCardDTO>> GetAllWithCardDataAsync()
        {
            var list = await _dbcontext.Advertisements.Select( a => new AdvertisementCardDTO
            {
                Id= a.Id,
                CategoryName = a.Category.Name,
                PostalCode = a.Address.PostalCode,
                City = a.Address.City,
                District = a.Address.District,
                StreetName = a.Address.StreetName,
                StreetNumber = a.Address.StreetNumber,
                NumberOfRooms = a.NumberOfRooms,
                Size = a.Size,
                MonthlyPrice = a.MonthlyPrice,
                Image = a.Images.First().Data
            }).ToListAsync();
                
            return  list;
        }

        public async Task<AdvertisementDetailsDTO?> GetByIdWithDetailsAsync(int id)
        {
            var advertisement = await _dbcontext.Advertisements.Where(a=>a.Id==id).Select(a => new AdvertisementDetailsDTO
            {
                Id = a.Id,
                CategoryName=a.Category.Name,
                Region=a.Address.Region,
                PostalCode=a.Address.PostalCode,
                City=a.Address.City,
                District=a.Address.District,
                StreetName=a.Address.StreetName,
                StreetNumber=a.Address.StreetNumber,
                UnitNumber=a.Address.UnitNumber,
                NumberOfRooms=a.NumberOfRooms,
                Size = a.Size,
                Furnished=a.Furnished,
                Parking=a.Parking,
                Description=a.Description,
                MonthlyPrice=a.MonthlyPrice,
                Image=a.Images.First().Data

            }).SingleOrDefaultAsync();

            return advertisement;
        }
    }
}
