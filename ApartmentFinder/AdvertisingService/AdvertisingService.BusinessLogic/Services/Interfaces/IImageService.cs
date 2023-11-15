namespace AdvertisingService.BusinessLogic.Services.Interfaces;

public interface IImageService
{
    Task<int> CreateNewImageAsync(MemoryStream stream, int advertisementId);
}