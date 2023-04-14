using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.BusinessLogic.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AdvertisingService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        private readonly AdvertisementService _advertisementService;
        private readonly ImageService _imageService;
        public AdvertisementController(AdvertisementService advertisementService, ImageService imageService)
        {
            _advertisementService = advertisementService;
            _imageService = imageService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementCardDTO>>> GetAdvertisementCardsAsync([FromQuery]QueryParamsDTO queryParams)
        {
            var advertisements = await _advertisementService.GetAllAdvertisementsAsync(queryParams);
            return Ok(advertisements);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<AdvertisementDetailsDTO>> GetAdvertisementDetailsAsync(int id)
        {
            var advertisement = await _advertisementService.GetAdvertisementDetailsAsync(id);
            return Ok(advertisement);
        }

        [HttpPost]
        [Route("private")]
        public async Task<ActionResult<int>> PostNewAdvertisementAsync([FromForm] AdvertisementDetailsDTO data)
        {
            int newAdvertisementId;
            try
            {
                if (Request.Form.Files.Count == 0)
                {
                    return BadRequest("List of files was empty. Please upload a file.");
                }

                newAdvertisementId = await _advertisementService.CreateNewAdvertisementAsync(data);

                var file = Request.Form.Files[0];
                var bytes = await ConvertFileDataToBytesAsync(file);
                if (file.Length > 0)
                {
                    await _imageService.CreateNewImageAsync(bytes, newAdvertisementId);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(newAdvertisementId);

            async Task<byte[]> ConvertFileDataToBytesAsync(IFormFile file)
            {
                using var stream = new MemoryStream();
                await file.CopyToAsync(stream);
                var fileData = stream.ToArray();

                return fileData;
            }
        }

    }
}
