using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IAddressRepository
{
    Task<Address?> Get(int id);
    Task Add(Address address);
}