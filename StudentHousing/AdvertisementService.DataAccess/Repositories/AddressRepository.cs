using AdvertisementService.BusinessLogic.Models;
using AdvertisementService.BusinessLogic.RepositoryInterfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisementService.DataAccess.Repositories
{
    public class AddressRepository : RepositoryBase<Address>, IAddressRepository
    {
        public AddressRepository(AdvertisementDbContext dbcontext) : base(dbcontext)
        {
        }
    }
}
