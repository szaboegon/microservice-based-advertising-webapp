using AdvertisementService.BusinessLogic.Models;
using AdvertisementService.BusinessLogic.RepositoryInterfaces;
using Microsoft.AspNetCore.Mvc;
using AdvertisementService.BusinessLogic.Services;
using AdvertisementService.BusinessLogic.DataTransferObjects;

namespace AdvertisementService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        private readonly IAdvertisementRepository _repository;
        public AdvertisementController(IAdvertisementRepository repository) 
        {
            _repository = repository;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Advertisement>> GetAdvertisements() 
        {
            return _repository.FindAll().ToList();
        }

        [HttpPost]
        public ActionResult PostNewAdvertisement([FromBody]NewAdvertisementDTO data)
        {
            if (AdService.CreateNewAdvertisement(data))
            {
                return Ok();
            }

            return BadRequest();
        }

    }
}
