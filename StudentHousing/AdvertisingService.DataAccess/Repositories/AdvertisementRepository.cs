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
                CategoryName = a.Category.Name,
                PostalCode = a.Address.PostalCode,
                City = a.Address.City,
                District = a.Address.District,
                StreetName = a.Address.StreetName,
                StreetNumber = a.Address.StreetNumber,
                NumberOfRooms = a.NumberOfRooms,
                Size = a.Size,
                MonthlyPrice = a.MonthlyPrice
            }).ToListAsync();
                
            return  list;
        }
    }
}
