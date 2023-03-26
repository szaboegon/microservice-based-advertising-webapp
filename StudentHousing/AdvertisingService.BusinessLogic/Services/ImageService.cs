using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;


namespace AdvertisingService.BusinessLogic.Services
{
    public class ImageService
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

        public async Task<int> CreateNewImageAsync(byte[] fileData, int advertisementId)
        {
            var advertisement= await _advertisementRepository.GetByIdAsync(advertisementId);
            if (advertisement == null)
                throw new ArgumentNullException(nameof(advertisement));

            var newImage = new Image
            {
                Data = fileData,
                Advertisement=advertisement
            };

            var validationResult = await _imageValidator.ValidateAsync(newImage);
            if (!validationResult.IsValid)
            {
                foreach (var error in validationResult.Errors)
                {
                    throw new ValidationException(error.ErrorMessage);
                }
            }

            await _imageRepository.AddAsync(newImage);
            await _imageRepository.SaveAsync();

            return newImage.Id;
        }
    }
}
