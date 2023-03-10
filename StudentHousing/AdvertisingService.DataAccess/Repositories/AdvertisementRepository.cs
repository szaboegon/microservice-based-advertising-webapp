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
        }

    }
}
