using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.BusinessLogic.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;

namespace AdvertisingService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        public AdvertisementService _advertisementService;
        public AdvertisementController(AdvertisementService advertisementService)
        {
            _advertisementService = advertisementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertisementCardDTO>>> GetAdvertisementCards()
        {
            var advertisements = await _advertisementService.GetAllAdvertisements();
            return Ok(advertisements);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertisementDetailsDTO>> GetAdvertisementDetails(int id)
        {
            return Ok();
            AdvertisementDetailsDTO advertisement;

            try
            {
                advertisement = await _advertisementService.GetAdvertisementDetails(id);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(advertisement);
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostNewAdvertisement([FromForm] AdvertisementDetailsDTO data)
        {
            int newAdvertisementId;
            try
            {
                newAdvertisementId = await _advertisementService.CreateNewAdvertisement(data);

            } catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(newAdvertisementId);

        }

    }
}
