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

                entity.Property(e=>e.Street)
                      .HasColumnName("street")
                      .IsRequired()
                      .HasColumnType("nvarchar")
                      .HasMaxLength(40);

                entity.Property(e => e.StreetNumber)
                      .HasColumnName("streetNumber")
                      .IsRequired()
                      .HasColumnType("nvarchar")
                      .HasMaxLength(10);

                entity.Property(e => e.UnitNumber)
                      .HasColumnName("unitNumber")
                      .HasColumnType("nvarchar")
                      .HasMaxLength(10);
            });

            modelBuilder.Entity<Advertisement>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id")
                      .IsRequired();

                entity.Property(e => e.UploadDate)
                      .HasColumnName("uploadDate")
                      .IsRequired()
                      .HasDefaultValue(DateTime.Now);

                entity.Property(e => e.Description)
                      .HasColumnName("description")
                      .IsRequired()
                      .HasColumnType("nvarchar")
                      .HasMaxLength(300);

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
                      .IsRequired()
                      .HasColumnType("nvarchar")
                      .HasMaxLength(30);
            });

            modelBuilder.Entity<Housing>(entity =>
            {
                entity.Property(e => e.Id)
                      .HasColumnName("id")
                      .IsRequired();

                entity.Property(e => e.NumberOfRooms)
                      .HasColumnName("numberOfRooms")
                      .HasColumnType("smallint")
                      .IsRequired();

                entity.Property(e => e.Size)
                     .HasColumnName("smallint")
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
                      .IsRequired()
                      .HasColumnType("nvarchar")
                      .HasMaxLength(255);

                entity.Property(e => e.HousingId)
                     .HasColumnName("advertisementId")
                     .IsRequired();

                entity.HasOne(i => i.Housing)
                      .WithMany(h => h.Images)
                      .HasForeignKey(i => i.HousingId)
                      .OnDelete(DeleteBehavior.ClientSetNull)
                      .HasConstraintName("FK_Image_Housing");
            });

        }

    }
}
