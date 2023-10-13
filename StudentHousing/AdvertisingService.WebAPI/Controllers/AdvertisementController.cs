using System.IdentityModel.Tokens.Jwt;
using AdvertisingService.BusinessLogic.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using AdvertisingService.BusinessLogic.Dtos;
using AdvertisingService.WebAPI.Dtos;
using AdvertisingService.WebAPI.Extensions;
using FluentValidation;
using Microsoft.IdentityModel.Tokens;
using AdvertisementDetailsDto = AdvertisingService.WebAPI.Dtos.AdvertisementDetailsDto;
using AdvertisementDto = AdvertisingService.WebAPI.Dtos.AdvertisementDto;

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
    public async Task<ActionResult<PagedQueryResponseDto<AdvertisementDto>>> GetAdvertisements([FromQuery] QueryParamsRequestDto queryParams)
    {
        var advertisements = await _advertisementService.GetAdvertisementsByQueryAsync(queryParams);
        return new PagedQueryResponseDto<AdvertisementDto>(advertisements.Items.Select(a => a.ToDto()).ToList(),
            advertisements.CurrentPage,
            advertisements.TotalPages, advertisements.PageItemCount, advertisements.TotalItemCount);

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

        return Ok(advertisement.ToDetailsDto());
    }

    [HttpPost]
    [Route("private/advertisements")]
    public async Task<ActionResult<int>> CreateAdvertisement([FromForm]AdvertisementCreateDto advertisementCreate, [FromForm]List<IFormFile> images) 
    {
        try
        {
            if (images.IsNullOrEmpty())
            {
                return BadRequest("At least one image is required.");
            }

            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var advertiserId = GetAdvertiserIdFromToken(tokenString);

            var newAdvertisement = await _advertisementService.CreateAdvertisementAsync(advertisementCreate, advertiserId);

            foreach (var image in images)
            {
                var bytes = await ConvertFileDataToBytesAsync(image);
                await _imageService.CreateNewImageAsync(bytes, newAdvertisement.Id);
            }
            
            return CreatedAtAction(nameof(GetAdvertisement), new { id = newAdvertisement.Id },
                newAdvertisement.ToDetailsDto());
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
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
    public async Task<ActionResult> DeleteAdvertisement(int id) 
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");
            var advertiserId = GetAdvertiserIdFromToken(tokenString);

            var deletedAdvertisement = await _advertisementService.DeleteAdvertisementAsync(id, advertiserId);

            if (deletedAdvertisement == null)
            {
                return NotFound();
            }

            return NoContent();
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (ValidationException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("private/advertisements_by_user")]
    public async Task<ActionResult<IEnumerable<AdvertisementDto>>> GetAdvertisementByUserId()
    {
        try
        {
            var tokenString = Request.Headers[HeaderNames.Authorization].ToString().Replace("Bearer ", "");

            var advertiserId = GetAdvertiserIdFromToken(tokenString);
            var result = await _advertisementService.GetAdvertisementsByUserAsync(advertiserId);
            return Ok(result.Select(a => a.ToDto()));
        }
        catch (SecurityTokenException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet]
    [Route("public/latest_advertisements/{count:int}")]
    public async Task<ActionResult<IEnumerable<AdvertisementDto>>> GetLatestAdvertisements(int count)
    {
        try
        {
            var result = await _advertisementService.GetLatestAdvertisementsAsync(count);
            return Ok(result.Select(a => a.ToDto()));
        }
        catch (ArgumentOutOfRangeException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    private int GetAdvertiserIdFromToken(string? tokenString)
    {
        if(string.IsNullOrEmpty(tokenString))
        {
            throw new SecurityTokenException("Request contains no security token.");
        }

        var jwtSecurityToken = _tokenHandler.ReadJwtToken(tokenString);
        var advertiserId = jwtSecurityToken.Claims.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        return advertiserId == null
            ? throw new SecurityTokenException("Advertiser id could not be determined from security token.")
            : int.Parse(advertiserId);
    }
}