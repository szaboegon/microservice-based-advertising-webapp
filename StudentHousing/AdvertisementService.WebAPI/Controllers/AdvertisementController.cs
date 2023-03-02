using AdvertisementService.BusinessLogic.Models;
using AdvertisementService.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AdvertisementService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        private readonly AdvertisementDbContext _dbContext;
        public AdvertisementController(AdvertisementDbContext dbContext) 
        {
          _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Advertisement>> GetAdvertisements() 
        {
            return _dbContext.Advertisements;
        }
    }
}
