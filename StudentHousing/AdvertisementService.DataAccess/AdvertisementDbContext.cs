using AdvertisementService.BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage;

namespace AdvertisementService.DataAccess
{
    public class AdvertisementDbContext : DbContext
    {
        public AdvertisementDbContext(DbContextOptions<AdvertisementDbContext> dbContextOptions) : base(dbContextOptions)
        {
            try
            {
                var databaseCreator = Database.GetService<IDatabaseCreator>() as RelationalDatabaseCreator;
                if (databaseCreator != null)
                {
                    if (!databaseCreator.CanConnect()) databaseCreator.Create();
                    if (!databaseCreator.HasTables()) databaseCreator.CreateTables();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
        }

        public DbSet<Address> Addresses { get; set; }
        public DbSet<Advertisement> Advertisements { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Housing> Housings { get; set; }
        public DbSet<Image> Images { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) 
        {
            modelBuilder.Entity<Address>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id");

                entity.Property(e => e.Region)
                      .HasColumnName("region")
                       .IsRequired();

                entity.Property(e => e.PostalCode)
                      .HasColumnName("postalCode")
                      .IsRequired();

                entity.Property(e => e.City)
                      .HasColumnName("city")
                      .IsRequired();

                entity.Property(e => e.District)
                      .HasColumnName("district");

                entity.Property(e=>e.Street)
                      .HasColumnName("street")
                      .IsRequired();

                entity.Property(e => e.StreetNumber)
                      .HasColumnName("streetNumber")
                      .IsRequired();

                entity.Property(e => e.UnitNumber)
                      .HasColumnName("unitNumber");
            });

            modelBuilder.Entity<Advertisement>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id")
                      .IsRequired();

                entity.Property(e => e.UploadDate)
                      .HasColumnName("uploadDate")
                      .IsRequired()
                      .HasDefaultValue(DateOnly.FromDateTime(DateTime.Now));

                entity.Property(e => e.Description)
                      .HasColumnName("description")
                      .IsRequired();

                entity.Property(e => e.AdvertiserId)
                      .HasColumnName("advertiserId")
                      .IsRequired();

                entity.Property(e => e.HousingId)
                      .HasColumnName("housingId")
                      .IsRequired();

                entity.HasOne(a => a.Housing)
                      .WithOne(h => h.Advertisement)
                      .HasForeignKey<Advertisement>(a => a.HousingId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Advertisement_Housing");

            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id")
                      .IsRequired();

                entity.Property(e => e.Name)
                      .HasColumnName("name")
                      .IsRequired();
            });

            modelBuilder.Entity<Housing>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id")
                      .IsRequired();

                entity.Property(e => e.NumberOfRooms)
                      .HasColumnName("numberOfRooms")
                      .IsRequired();

                entity.Property(e => e.Size)
                     .HasColumnName("size")
                     .IsRequired();

                entity.Property(e => e.Furnished)
                     .HasColumnName("furnished")
                     .IsRequired();

                entity.Property(e => e.ParkingAvailable)
                     .HasColumnName("parkingAvailable")
                     .IsRequired();

                entity.Property(e => e.MonthlyPrice)
                    .HasColumnName("monthlyPrice")
                    .IsRequired();

                entity.Property(e => e.AddressId)
                    .HasColumnName("addressId")
                    .IsRequired();

                entity.Property(e => e.CategoryId)
                    .HasColumnName("categoryId")
                    .IsRequired();

                entity.HasOne(h => h.Address)
                      .WithOne(a => a.Housing)
                      .HasForeignKey<Housing>(h => h.AddressId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Housing_Address");

                entity.HasOne(h => h.Category)
                     .WithMany(c => c.Housings)
                     .HasForeignKey(h => h.CategoryId)
                     .OnDelete(DeleteBehavior.ClientSetNull)
                     .HasConstraintName("FK_Housing_Category");
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id")
                      .IsRequired();

                entity.Property(e => e.FilePath)
                      .HasColumnName("filePath")
                      .IsRequired();

                entity.Property(e => e.AdvertisementId)
                     .HasColumnName("advertisementId")
                     .IsRequired();

                entity.HasOne(i => i.Advertisement)
                      .WithMany(a => a.Images)
                      .HasForeignKey(i => i.AdvertisementId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Image_Advertisement");
            });

        }

    }
}
