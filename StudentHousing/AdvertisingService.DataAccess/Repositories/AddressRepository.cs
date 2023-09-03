using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.Data;

namespace AdvertisingService.DataAccess.Repositories;

public class AddressRepository : RepositoryBase<Address>, IAddressRepository
{
    private readonly AdvertisementDbContext _dbcontext;
    public AddressRepository(AdvertisementDbContext dbcontext) : base(dbcontext)
    {
        _dbcontext = dbcontext;
    }
}