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

        /*[HttpGet]
        public ActionResult<IEnumerable<Advertisement>> GetAdvertisements() 
        {
            
        }*/

        [HttpPost]
        public ActionResult PostNewAdvertisement([FromBody]NewAdvertisementDTO data)
        {
            
           bool success=_advertisementService.CreateNewAdvertisement(data);

            if(success)
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}
