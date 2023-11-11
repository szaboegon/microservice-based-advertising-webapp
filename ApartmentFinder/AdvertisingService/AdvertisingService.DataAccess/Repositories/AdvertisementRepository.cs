using System.Diagnostics;
using System.Linq.Expressions;
using AdvertisingService.BusinessLogic.Helpers.Interfaces;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.DAL;
using AdvertisingService.DataAccess.Helpers;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Repositories;

public class AdvertisementRepository : IAdvertisementRepository
{
    private readonly AdvertisementDbContext _dbcontext;
    public AdvertisementRepository(AdvertisementDbContext dbcontext)
    {
        _dbcontext = dbcontext;
    }

    public async Task<Advertisement?> Get(int id)
    {
        return await _dbcontext.Advertisements.Where(a => a.Id == id).SingleOrDefaultAsync();
    }

    public async Task<AdvertisementDetails?> GetDetails(int id)
    {
        return await _dbcontext.Advertisements.Where(a => a.Id == id).Select(advertisement => new AdvertisementDetails
        {
            Id = advertisement.Id,
            CategoryName = advertisement.Category.Name,
            Region = advertisement.Address.Region,
            PostalCode = advertisement.Address.PostalCode,
            City = advertisement.Address.City,
            District = advertisement.Address.District,
            StreetName = advertisement.Address.StreetName,
            StreetNumber = advertisement.Address.StreetNumber,
            UnitNumber = advertisement.Address.UnitNumber,
            NumberOfRooms = advertisement.NumberOfRooms,
            Size = advertisement.Size,
            Furnished = advertisement.Furnished,
            Parking = advertisement.Parking,
            Description = advertisement.Description,
            MonthlyPrice = advertisement.MonthlyPrice,
            Images = advertisement.Images.Select(i => i.Data),
            AdvertiserId = advertisement.AdvertiserId

        }).SingleOrDefaultAsync();
    }

    public async Task Add(Advertisement advertisement)
    {
        await _dbcontext.Advertisements.AddAsync(advertisement);
        await _dbcontext.SaveChangesAsync();
    }

    public void Remove(Advertisement advertisement)
    {
        _dbcontext.Advertisements.Remove(advertisement);
        _dbcontext.SaveChanges();
    }

    public async Task<IEnumerable<AdvertisementInfo>> GetByAdvertiserId(int id)
    {
        return await _dbcontext.Advertisements
            .Where(a => a.AdvertiserId == id)
            .Select(advertisement => new AdvertisementInfo()
            {
                Id = advertisement.Id,
                CategoryName = advertisement.Category.Name,
                City = advertisement.Address.City,
                District = advertisement.Address.District,
                StreetName = advertisement.Address.StreetName,
                StreetNumber = advertisement.Address.StreetNumber,
                NumberOfRooms = advertisement.NumberOfRooms,
                Size = advertisement.Size,
                MonthlyPrice = advertisement.MonthlyPrice,
                UploadDate = advertisement.UploadDate,
                Image = advertisement.Images.First().Data, 
            })
            .ToListAsync();
    }

    public async Task<IEnumerable<AdvertisementInfo>> GetLatest(int count)
    {
        return await _dbcontext.Advertisements
            .OrderByDescending(a => a.UploadDate)
            .Take(count)
            .Select(advertisement => new AdvertisementInfo()
            {
                Id = advertisement.Id,
                CategoryName = advertisement.Category.Name,
                City = advertisement.Address.City,
                District = advertisement.Address.District,
                StreetName = advertisement.Address.StreetName,
                StreetNumber = advertisement.Address.StreetNumber,
                NumberOfRooms = advertisement.NumberOfRooms,
                Size = advertisement.Size,
                MonthlyPrice = advertisement.MonthlyPrice,
                UploadDate = advertisement.UploadDate,
                Image = advertisement.Images.First().Data,
            })
            .ToListAsync();
    }

    public async Task<IPagedList<AdvertisementInfo>> GetByQuery(QueryParamsRequest query)
    {
        var advertisementQuery = ApplyQueryParams(query);

        Expression<Func<Advertisement, object>> keySelector = query.SortColumn?.ToLower() switch
        {
            "size" => advertisement => advertisement.Size,
            "monthlyprice" => advertisement => advertisement.MonthlyPrice,
            "uploaddate" => advertisement => advertisement.UploadDate,
            _ => advertisement => advertisement.Id
        };

        advertisementQuery = query.SortOrder?.ToLower() == "desc"
            ? advertisementQuery.OrderByDescending(keySelector)
            : advertisementQuery.OrderBy(keySelector);

        if (query is not { CurrentPage: >= 1, PageItemCount: > 0 })
        {
            throw new ArgumentException("Invalid paging values");
        }

        return await PagedList<AdvertisementInfo>.CreateAsync(advertisementQuery
            .Select(advertisement => new AdvertisementInfo()
            {
                Id = advertisement.Id,
                CategoryName = advertisement.Category.Name,
                City = advertisement.Address.City,
                District = advertisement.Address.District,
                StreetName = advertisement.Address.StreetName,
                StreetNumber = advertisement.Address.StreetNumber,
                NumberOfRooms = advertisement.NumberOfRooms,
                Size = advertisement.Size,
                MonthlyPrice = advertisement.MonthlyPrice,
                UploadDate = advertisement.UploadDate,
                Image = advertisement.Images.First().Data,
            }), query.CurrentPage, query.PageItemCount);
    }

    private IQueryable<Advertisement> ApplyQueryParams(QueryParamsRequest query)
    {
        var advertisementQuery = _dbcontext.Advertisements
            .Where(a => (string.IsNullOrEmpty(query.CategoryName) || a.Category.Name == query.CategoryName))
            .Where(a => (string.IsNullOrEmpty(query.City) || (a.Address.City.ToLower()).Contains(query.City.ToLower())))
            .Where(a => (query.NumberOfRooms == null || Equals(a.NumberOfRooms, query.NumberOfRooms)))
            .Where(a => (query.MinSize == null || a.Size >= query.MinSize))
            .Where(a => (query.MaxSize == null || a.Size <= query.MaxSize))
            .Where(a => (query.MinMonthlyPrice == null || a.MonthlyPrice >= query.MinMonthlyPrice))
            .Where(a => (query.MaxMonthlyPrice == null || a.MonthlyPrice <= query.MaxMonthlyPrice))
            .Where(a => (query.Furnished == null || a.Furnished == query.Furnished))
            .Where(a => (query.Parking == null || a.Parking == query.Parking));
        return advertisementQuery;
    }
}