using AdvertisingService.BusinessLogic.DataTransferObjects;
using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.BusinessLogic.RepositoryInterfaces;
using AdvertisingService.DataAccess.DAL;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Repositories;

public class 
    AdvertisementRepository : IAdvertisementRepository
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

    public void RemoveRange(IEnumerable<Advertisement> advertisements)
    {
        _dbcontext.Advertisements.RemoveRange(advertisements);
        _dbcontext.SaveChanges();
    }

    public IQueryable<Advertisement> GetAllAsIQueryable()
    {
        var list = _dbcontext.Advertisements.Where(_ => true);
        return list;
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

    public async Task<IEnumerable<Advertisement>> GetByQuery(QueryParamsDto query)
    {
        return await _dbcontext.Advertisements
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
            .Where(a => (query.Parking == null || a.Parking == query.Parking))
            .ToListAsync();
    }
}