namespace AdvertisingService.BusinessLogic.Services.Interfaces;

public interface IImageService
{
    Task<int> CreateNewImageAsync(byte[] fileData, int advertisementId);
}