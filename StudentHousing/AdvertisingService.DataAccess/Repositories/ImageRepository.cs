using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.Data;

namespace AdvertisingService.DataAccess.Repositories
{
    public class ImageRepository : RepositoryBase<Image>, IImageRepository
    {
        public ImageRepository(AdvertisementDbContext dbcontext) : base(dbcontext)
        {
        }
    }
}
