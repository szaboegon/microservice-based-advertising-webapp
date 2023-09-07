using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.DAL;

namespace AdvertisingService.DataAccess.Repositories;

public class ImageRepository: IImageRepository
{
    private readonly AdvertisementDbContext _dbcontext;

    public ImageRepository(AdvertisementDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task Add(Image image)
    {
        await _dbcontext.Images.AddAsync(image);
        await _dbcontext.SaveChangesAsync();
    }
}