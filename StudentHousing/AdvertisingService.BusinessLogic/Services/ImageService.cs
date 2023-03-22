using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.Models.Validators;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using FluentValidation;
using Microsoft.AspNetCore.Http;


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

        public async Task<byte[]> ConvertFileDataToBytesAsync(IFormFile file)
        {
            byte[] fileData;
            using (var stream = new MemoryStream())
            {
                await file.CopyToAsync(stream);
                fileData = stream.ToArray();
            }

            return fileData;
        }

        public async Task<int> CreateNewImageAsync(IFormFile file, int advertisementId)
        {
            var advertisement= await _advertisementRepository.GetByIdAsync(advertisementId);
            if (advertisement == null)
                throw new ArgumentNullException(nameof(advertisement));

            var fileData = await ConvertFileDataToBytesAsync(file);
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
