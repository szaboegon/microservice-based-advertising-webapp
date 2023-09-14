using System.Diagnostics;
using System.Linq.Expressions;
using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Helpers;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.DAL;
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
        return await _dbcontext.Advertisements
            .Include(a => a.Address)
            .Include(a => a.Category)
            .Include(a => a.Images)
            .Where(a => a.Id == id)
            .SingleOrDefaultAsync();
    }

    public async Task<IEnumerable<Advertisement>> GetAll()
    {
        return await _dbcontext.Advertisements
            .Include(a => a.Address)
            .Include(a => a.Category)
            .Include(a => a.Images)
            .ToListAsync();
    }

    public async Task Add(Advertisement advertisement)
    {
        await _dbcontext.Advertisements.AddAsync(advertisement);
        await _dbcontext.SaveChangesAsync();
    }

    public async Task AddRange(IEnumerable<Advertisement> advertisements)
    {
        await _dbcontext.Advertisements.AddRangeAsync(advertisements);
        await _dbcontext.SaveChangesAsync();
    }

    public void Remove(Advertisement advertisement)
    {
        _dbcontext.Advertisements.Remove(advertisement);
        _dbcontext.SaveChanges();
    }

    public async Task<IEnumerable<Advertisement>> GetByAdvertiserId(int id)
    {
        return await _dbcontext.Advertisements
            .Include(a => a.Address)
            .Include(a => a.Category)
            .Include(a => a.Images)
            .Where(a => a.AdvertiserId == id)
            .ToListAsync();
    }

    public async Task<IEnumerable<Advertisement>> GetLatest(int count)
    {
        return await _dbcontext.Advertisements
            .Include(a => a.Address)
            .Include(a => a.Category)
            .Include(a => a.Images)
            .OrderByDescending(a => a.UploadDate)
            .Take(count)
            .ToListAsync();
    }

    public async Task<PagedList<Advertisement>> GetByQuery(QueryParamsDto query)
    {
        var advertisementQuery = ApplyQueryParams(query);
        var totalItemCount = advertisementQuery.Count();

        Expression<Func<Advertisement, object>> keySelector = query.SortColumn?.ToLower() switch
        {
            "size" => advertisement => advertisement.Size,
            "monthlyprice" => advertisement => advertisement.MonthlyPrice,
            _ => advertisement => advertisement.Id
        };

        advertisementQuery = query.SortOrder?.ToLower() == "desc" ? advertisementQuery.OrderByDescending(keySelector) : advertisementQuery.OrderBy(keySelector);

        if (query is not { CurrentPage: >= 1, PageItemCount: > 0 })
        {
            throw new ArgumentException("Invalid paging values");
        }

        return new PagedList<Advertisement>(advertisementQuery, query.CurrentPage, query.PageItemCount);
    }

    private IQueryable<Advertisement> ApplyQueryParams(QueryParamsDto query)
    {
        var advertisementQuery = _dbcontext.Advertisements
            .Include(a => a.Address)
            .Include(a => a.Category)
            .Include(a => a.Images)
            .Where(a => (string.IsNullOrEmpty(query.CategoryName) || a.Category.Name == query.CategoryName))
            .Where(a => (string.IsNullOrEmpty(query.City) || a.Address.City == query.City))
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