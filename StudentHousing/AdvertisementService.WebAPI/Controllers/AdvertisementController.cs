using AdvertisementService.BusinessLogic.Models;
using AdvertisementService.BusinessLogic.RepositoryInterfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
    }
}
