using System.IdentityModel.Tokens.Jwt;
using AdvertisingService.BusinessLogic.Services;
using AdvertisingService.BusinessLogic.DataTransferObjects;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;

namespace AdvertisingService.WebAPI.Controllers;

[Route("api/advertisement")]
[ApiController]
public class AdvertisementController : ControllerBase
{
    private readonly AdvertisementService _advertisementService;
    private readonly ImageService _imageService;
    private readonly JwtSecurityTokenHandler _tokenHandler;
    public AdvertisementController(AdvertisementService advertisementService, ImageService imageService)
    {
        _advertisementService = advertisementService;
        _imageService = imageService;
        _tokenHandler = new JwtSecurityTokenHandler();
    }

    [HttpGet]
    [Route("public/advertisement_cards")]
    public async Task<ActionResult<IEnumerable<AdvertisementCardDTO>>> GetAdvertisementCardsAsync([FromQuery]QueryParamsDto queryParams)
    {
        var advertisements = await _advertisementService.GetAllAdvertisementsAsync(queryParams);
        return Ok(advertisements);
    }

    [HttpGet]
    [Route("public/advertisement_details/{id:int}")]
    public async Task<ActionResult<AdvertisementDetailsDTO>> GetAdvertisementDetailsAsync(int id)
    {
        var advertisement = await _advertisementService.GetAdvertisementDetailsAsync(id);
        return Ok(advertisement);
    }

    [HttpPost]
    [Route("private/advertisements")]
    public async Task<ActionResult<int>> PostNewAdvertisementAsync([FromForm] AdvertisementDetailsDTO data)
    {
        int newAdvertisementId;
        try
        {
            if (Request.Form.Files.Count == 0)
            {
                return BadRequest("List of files was empty. Please upload a file.");
            }

            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                return BadRequest("Token is invalid.");
            }

            var advertiserId = jwtSecurityToken.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Sub).Value;

            newAdvertisementId = await _advertisementService.CreateNewAdvertisementAsync(data, int.Parse(advertiserId));

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

    [HttpDelete]
    [Route("private/advertisements/{id:int}")]
    public async Task<ActionResult> DeleteAdvertisementAsync(int id)
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                return BadRequest("Token is invalid.");
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
    public async Task<ActionResult<IEnumerable<AdvertisementCardDTO>>> GetAdvertisementsByUserAsync(int id)
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);

            if (jwtSecurityToken == null)
            {
                return BadRequest("Token is invalid");
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
    public async Task<ActionResult<IEnumerable<AdvertisementCardDTO>>> GetLatestAdvertisementsAsync(int count)
    {
        try
        {
            var result = await _advertisementService.GetLatestAdvertisementsAsync(count);
            return Ok(result);
        }
        catch(Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}