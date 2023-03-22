using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.Services
{
    public class ImageService
    {
        private readonly IAdvertisementRepository _advertisementRepository;
        private readonly IImageRepository _imageRepository;
        public ImageService(IAdvertisementRepository advertisementRepository, IAddressRepository addressRepository, ICategoryRepository categoryRepository, IImageRepository imageRepository)
        {
            _advertisementRepository = advertisementRepository;
            _imageRepository = imageRepository;
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
            var fileData = await ConvertFileDataToBytesAsync(file);
            var newImage = new Image
            {
                Data = fileData,
                Advertisement=advertisement
            };

            await _imageRepository.AddAsync(newImage);
            await _imageRepository.SaveAsync();

            return newImage.Id;
        }
    }
}
