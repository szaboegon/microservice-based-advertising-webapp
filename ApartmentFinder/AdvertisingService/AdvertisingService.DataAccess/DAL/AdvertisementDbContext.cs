using AdvertisingService.BusinessLogic.Models;
using AdvertisingService.DataAccess.Extensions;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.DAL;

public class AdvertisementDbContext : DbContext
{
    public AdvertisementDbContext(DbContextOptions<AdvertisementDbContext> dbContextOptions)
        : base(dbContextOptions)
    {
    }

    public DbSet<Address> Addresses { get; set; }
    public DbSet<Advertisement> Advertisements { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Image> Images { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Address>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.Region)
                .HasColumnName("region")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(30);

            entity.Property(e => e.PostalCode)
                .HasColumnName("postalCode")
                .IsRequired()
                .HasColumnType("smallint");

            entity.Property(e => e.City)
                .HasColumnName("city")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(30);

            entity.Property(e => e.District)
                .HasColumnName("district")
                .HasColumnType("nvarchar")
                .HasMaxLength(20);

            entity.Property(e => e.StreetName)
                .HasColumnName("streetName")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(40);

            entity.Property(e => e.StreetNumber)
                .HasColumnName("streetNumber")
                .HasColumnType("nvarchar")
                .HasMaxLength(10);

            entity.Property(e => e.UnitNumber)
                .HasColumnName("unitNumber")
                .HasColumnType("nvarchar")
                .HasMaxLength(10);

            entity.Property(e => e.AdvertisementId)
                .HasColumnName("advertisementId")
                .IsRequired();

            entity.HasOne(addr => addr.Advertisement)
                .WithOne(adv => adv.Address)
                .HasForeignKey<Address>(h => h.AdvertisementId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Address_Advertisement");
        });


        modelBuilder.Entity<Category>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.Name)
                .HasColumnName("name")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(30);
        });

        modelBuilder.Entity<Advertisement>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.NumberOfRooms)
                .HasColumnName("numberOfRooms")
                .HasColumnType("float")
                .IsRequired();

            entity.Property(e => e.Size)
                .HasColumnName("size")
                .HasColumnType("float")
                .IsRequired();

            entity.Property(e => e.Furnished)
                .HasColumnName("furnished")
                .IsRequired();

            entity.Property(e => e.Parking)
                .HasColumnName("parking")
                .IsRequired();

            entity.Property(e => e.MonthlyPrice)
                .HasColumnName("monthlyPrice")
                .HasColumnType("int")
                .IsRequired();

            entity.Property(e => e.UploadDate)
                .HasColumnName("uploadDate")
                .HasDefaultValue(DateTime.Now);

            entity.Property(e => e.Description)
                .HasColumnName("description")
                .IsRequired()
                .HasColumnType("nvarchar")
                .HasMaxLength(1000);

            entity.Property(e => e.AdvertiserId)
                .HasColumnName("advertiserId")
                .IsRequired();


            entity.Property(e => e.CategoryId)
                .HasColumnName("categoryId")
                .IsRequired();


            entity.HasOne(h => h.Category)
                .WithMany(c => c.Advertisements)
                .HasForeignKey(h => h.CategoryId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_Advertisement_Category");
        });

        modelBuilder.Entity<Image>(entity =>
        {
            entity.Property(e => e.Id)
                .HasColumnName("id");

            entity.Property(e => e.Data)
                .HasColumnName("data")
                .IsRequired()
                .HasColumnType("varbinary(max)");

            entity.Property(e => e.AdvertisementId)
                .HasColumnName("advertisementId")
                .IsRequired();

            entity.HasOne(i => i.Advertisement)
                .WithMany(h => h.Images)
                .HasForeignKey(i => i.AdvertisementId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Image_Advertisement");
        });

        //modelBuilder.SeedData();
    }
    
}