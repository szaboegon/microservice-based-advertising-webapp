using AdvertisingService.BusinessLogic.Models;

namespace AdvertisingService.BusinessLogic.RepositoryInterfaces;

public interface IImageRepository
{
    Task Add(Image image);
}