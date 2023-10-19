using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AdvertisingService.BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Extensions;

public static class ModelBuilderExtensions
{
    public static ModelBuilder SeedData(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
          new Category { Id = 1, Name = "apartment" },
          new Category { Id = 2, Name = "room" });

        modelBuilder.Entity<Advertisement>().HasData(
            new Advertisement
            {
                Id = 1,
                NumberOfRooms = 3,
                Size = 70,
                Furnished = true,
                Parking = false,
                MonthlyPrice = 250000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 2,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 3,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 4,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 5,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 6,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 7,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 8,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 9,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 10,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 11,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 12,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 13,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 14,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 15,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 16,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }, new Advertisement
            {
                Id = 17,
                NumberOfRooms = 1,
                Size = 20,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 100000,
                Description = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor." +
                              " Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus." +
                              " Donec quam felis, ultricies nec, pellentesque eu, pretium quis," +
                              " sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. " +
                              "In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu",
                AdvertiserId = 2,
                CategoryId = 2,
            }
            );


        modelBuilder.Entity<Address>().HasData(
            new Address
            {
                Id = 1,
                Region = "Pest",
                PostalCode = 1091,
                City = "Budapest",
                District = "XI.",
                StreetName = "Király utca",
                StreetNumber = "47.",
                UnitNumber = "15.",
                AdvertisementId = 1
            },
            new Address
            {
                Id = 2,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 2
            },
            new Address
            {
                Id = 3,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 3
            },
            new Address
            {
                Id = 4,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 4
            },
            new Address
            {
                Id = 5,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 5
            },
            new Address
            {
                Id = 6,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 6
            },
            new Address
            {
                Id = 7,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 7
            },
            new Address
            {
                Id = 8,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 8
            },
            new Address
            {
                Id = 9,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 9
            },
            new Address
            {
                Id = 10,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 10
            },
            new Address
            {
                Id = 11,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 11
            },
            new Address
            {
                Id = 12,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 12
            },
            new Address
            {
                Id = 13,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 13
            },
            new Address
            {
                Id = 14,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 14
            },
            new Address
            {
                Id = 15,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 15
            },
            new Address
            {
                Id = 16,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 16
            },
            new Address
            {
                Id = 17,
                Region = "Baranya",
                PostalCode = 7600,
                City = "Pécs",
                StreetName = "Kossuth utca",
                StreetNumber = "12.",
                UnitNumber = "10.",
                AdvertisementId = 17
            }
        );

        return modelBuilder;
    }
}