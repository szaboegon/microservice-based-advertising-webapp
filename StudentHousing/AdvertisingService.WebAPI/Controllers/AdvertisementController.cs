using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.BusinessLogic.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using AdvertisingService.BusinessLogic.Models;

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

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertisementDetailsDTO>> GetAdvertisementDetailsAsync(int id)
        {
            AdvertisementDetailsDTO advertisement = await _advertisementService.GetAdvertisementDetailsAsync(id);
            return Ok(advertisement);
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostNewAdvertisementAsync([FromForm] AdvertisementDetailsDTO data)
        {
            int newAdvertisementId;
            try
            {
                newAdvertisementId = await _advertisementService.CreateNewAdvertisementAsync(data);

                if (Request.Form.Files.Count == 0)
                {
                    return BadRequest("List of files was empty. Please upload a file.");
                }

                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    await _imageService.CreateNewImageAsync(file, newAdvertisementId);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(newAdvertisementId);
        }

    }
}
