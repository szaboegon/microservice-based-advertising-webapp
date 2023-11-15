using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.BusinessLogic.Services.Interfaces;
using FluentValidation;


namespace AdvertisingService.BusinessLogic.Services;

public class ImageService : IImageService
{
    private readonly IAdvertisementRepository _advertisementRepository;
    private readonly IImageRepository _imageRepository;
    private  readonly IValidator<Image> _imageValidator;
    public ImageService(IAdvertisementRepository advertisementRepository, IImageRepository imageRepository, IValidator<Image> imageValidator)
    {
        _advertisementRepository = advertisementRepository;
        _imageRepository = imageRepository;
        _imageValidator = imageValidator;
    }

    public async Task<int> CreateNewImageAsync(MemoryStream stream, int advertisementId)
    {
        var advertisement= await _advertisementRepository.Get(advertisementId);
        if (advertisement == null)
        {
            throw new KeyNotFoundException($"{nameof(advertisement)} cannot be null.");
        }

        var newImage = new Image
        {
            Data = stream.ToArray(),
            Advertisement=advertisement
        };

        await _imageValidator.ValidateAndThrowAsync(newImage);
        await _imageRepository.Add(newImage);

        return newImage.Id;
    }
}