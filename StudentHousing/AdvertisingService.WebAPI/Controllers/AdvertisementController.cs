using System.IdentityModel.Tokens.Jwt;
using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System.ComponentModel.DataAnnotations;
using AdvertisingService.BusinessLogic.Extensions;

namespace AdvertisingService.WebAPI.Controllers;

[Route("api/advertisement")]
[ApiController]
public class AdvertisementController : ControllerBase
{
    private readonly IAdvertisementService _advertisementService;
    private readonly IImageService _imageService;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    public AdvertisementController(IAdvertisementService advertisementService, IImageService imageService)
    {
        _advertisementService = advertisementService;
        _imageService = imageService;
        _tokenHandler = new JwtSecurityTokenHandler();
    }

    [HttpGet]
    [Route("public/advertisement_cards")]
    public async Task<ActionResult<PagedQueryResponse<AdvertisementDto>>> GetAdvertisements([FromQuery]QueryParamsDto queryParams)
    {
        var advertisements = await _advertisementService.GetAdvertisementsByQueryAsync(queryParams);
        return Ok(advertisements);
    }

    [HttpGet]
    [Route("public/advertisement_details/{id:int}")]
    public async Task<ActionResult<AdvertisementDetailsDto>> GetAdvertisement(int id)
    {
        var advertisement = await _advertisementService.GetAdvertisementDetailsAsync(id);
        if(advertisement == null)
        {
            return NotFound();
        }

        return Ok(advertisement);
    }

    [HttpPost]
    [Route("private/advertisements")]
    public async Task<ActionResult<int>> CreateAdvertisement([FromForm] AdvertisementDetailsDto data)   //look into files so it can be uploaded from swagger
    {
        try
        {
            if (Request.Form.Files.Count == 0)
            {
                return BadRequest("List of files was empty. Please upload a file.");
            }

            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

            if(tokenString == null)     //TODO implement this in other places --> probably a middleware (nick chapsas?)
            {
                return Unauthorized();
            }

            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                return Unauthorized();
            }

            var advertiserId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            var newAdvertisement = await _advertisementService.CreateAdvertisementAsync(data, int.Parse(advertiserId));

            var file = Request.Form.Files[0];
            var bytes = await ConvertFileDataToBytesAsync(file);
            if (file.Length > 0)
            {
                await _imageService.CreateNewImageAsync(bytes, newAdvertisement.Id);
            }

            return CreatedAtAction(nameof(GetAdvertisement), new{ id = newAdvertisement.Id }, newAdvertisement.ToDetailsDto());
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch(Exception) 
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Something went wrong");
        }

        async Task<byte[]> ConvertFileDataToBytesAsync(IFormFile file)
        {
            using var stream = new MemoryStream();
            await file.CopyToAsync(stream);
            var fileData = stream.ToArray();

            return fileData;
        }
    }

    [HttpDelete]
    [Route("private/advertisements/{id:int}")]
    public async Task<ActionResult> DeleteAdvertisement(int id) //TODO fix error handling
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                return Unauthorized();
            }

            var advertiserId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;
            await _advertisementService.DeleteAdvertisementAsync(id, int.Parse(advertiserId));
            return Ok();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("private/advertisements_by_user")]
    public async Task<ActionResult<IEnumerable<AdvertisementDto>>> GetAdvertisementByUserId(int id) //TODO fix error handling
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                return Unauthorized();
            }

            var advertiserId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;
            var result = await _advertisementService.GetAdvertisementsByUserAsync(int.Parse(advertiserId));
            return Ok(result);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("public/latest_advertisements/{count:int}")]
    public async Task<ActionResult<IEnumerable<AdvertisementDto>>> GetLatestAdvertisements(int count)
    {
        var result = await _advertisementService.GetLatestAdvertisementsAsync(count);
        return Ok(result);
    }
}