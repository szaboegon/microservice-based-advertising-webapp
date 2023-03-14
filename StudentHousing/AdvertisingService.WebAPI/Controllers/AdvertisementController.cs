using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using Microsoft.AspNetCore.Mvc;
using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.BusinessLogic.DataTransferObjects;

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
        public async Task<ActionResult<IEnumerable<Advertisement>>> GetAdvertisements() 
        {
            var advertisements=await _advertisementService.GetAllAdvertisements();
            return Ok(advertisements);
        }

        [HttpPost]
        public async Task<ActionResult<int>> PostNewAdvertisement([FromForm]NewAdvertisementDTO data)
        {
            int newAdvertisementId;
            try
            {
                newAdvertisementId= await _advertisementService.CreateNewAdvertisement(data);

            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return Ok(newAdvertisementId);

        }

    }
}
