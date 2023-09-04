using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.Data;

namespace AdvertisingService.DataAccess.Repositories;

public class AddressRepository: IAddressRepository
{
    private readonly AdvertisementDbContext _dbcontext;
    public AddressRepository(AdvertisementDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task<Address?> Get(int id)
    {
        return await _dbcontext.Addresses.FindAsync(id);
    }

    public async Task Add(Address address)
    {
        await _dbcontext.Addresses.AddAsync(address);
        await _dbcontext.SaveChangesAsync();
    }
}