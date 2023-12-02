using AdvertisingService.BusinessLogic.Models;
using Microsoft.EntityFrameworkCore;

namespace AdvertisingService.DataAccess.Extensions;

public static class ModelBuilderExtensions
{
    private const int AdvertisementCount = 21;
    public static ModelBuilder SeedData(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "apartment" },
            new Category { Id = 2, Name = "room" },
            new Category { Id = 3, Name = "house" });

        modelBuilder.Entity<Advertisement>().HasData(
            new Advertisement
            {
                Id = 1,
                NumberOfRooms = 3,
                Size = 70,
                Furnished = true,
                Parking = false,
                MonthlyPrice = 250000,
                Description = "Exquisite three-bedroom apartment with panoramic city vistas. Step into this exquisite three-bedroom apartment that boasts breathtaking panoramic views of the city skyline. The spacious and elegantly furnished interiors create an inviting ambiance, perfect for both relaxation and entertainment. The modern kitchen is equipped with premium appliances, catering to culinary enthusiasts. Retreat to the luxurious master suite offering a serene haven after a bustling day. Positioned in a vibrant neighborhood, this apartment offers access to a myriad of cultural attractions, fine dining, and entertainment options, ensuring an elevated urban lifestyle.",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 2,
                NumberOfRooms = 2,
                Size = 50,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 180000,
                Description =
                    "A cozy apartment with a great view. Discover the charm of this inviting two-room apartment that offers an exceptional living experience. As you step into this residence, you're greeted by a cozy atmosphere complemented by modern amenities and stylish design. The panoramic views from the large windows frame the city's beauty, creating a serene ambiance. Situated in a tranquil neighborhood, this home provides a perfect retreat from the city's hustle while maintaining easy access to essential facilities. With its thoughtful layout and convenient location near shopping districts and dining spots, this apartment ensures a harmonious blend of comfort and convenience, making it an ideal urban sanctuary.",
                AdvertiserId = 2,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 3,
                NumberOfRooms = 4,
                Size = 100,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 320000,
                Description =
                    "Spacious house with a backyard. Welcome to the epitome of luxury living in this charming four-bedroom furnished house. Encompassing generous living spaces and an exquisitely landscaped backyard, this residence offers an unparalleled level of comfort and elegance. The spacious interiors feature high-end finishes and modern conveniences, ensuring a delightful living experience. Nestled in a vibrant and family-friendly community, this home enjoys proximity to renowned educational institutions, scenic parks, and essential amenities. Whether you're unwinding in the serene backyard or enjoying the conveniences of nearby facilities, this property invites you to embrace a lifestyle of sophistication and relaxation.",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 4,
                NumberOfRooms = 3,
                Size = 75,
                Furnished = true,
                Parking = false,
                MonthlyPrice = 260000,
                Description =
                    "Modern apartment with stunning amenities. Immerse yourself in the epitome of modern living within this three-bedroom apartment that seamlessly combines luxury and functionality. Revel in the exquisite design and attention to detail that define this residence, offering an array of upscale amenities. From the state-of-the-art gym and refreshing swimming pool to the unparalleled security measures, every aspect is tailored for a sophisticated lifestyle. Located in a bustling yet welcoming neighborhood, this property provides easy access to a diverse range of entertainment options, gourmet dining experiences, and convenient transportation links, ensuring an exceptional urban living experience.",
                AdvertiserId = 2,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 5,
                NumberOfRooms = 1,
                Size = 35,
                Furnished = true,
                Parking = false,
                MonthlyPrice = 150000,
                Description =
                    "Chic studio apartment in a prime location. Indulge in the essence of modern living within this tastefully designed studio apartment. Elegantly furnished with a focus on comfort and style, this space is a haven for individuals seeking both convenience and sophistication. Its thoughtfully laid-out interior maximizes functionality without compromising aesthetics, providing a seamless living experience. Strategically nestled in the vibrant heart of the city, this apartment offers easy access to an array of trendy cafes, boutique shops, cultural hotspots, and vibrant nightlife. Whether you're a professional seeking a comfortable retreat after a bustling day or a connoisseur of urban living, this residence offers the perfect blend of modernity and accessibility.",
                AdvertiserId = 2,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 6,
                NumberOfRooms = 5,
                Size = 200,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 450000,
                Description =
                    "Luxurious penthouse with panoramic views. Elevate your lifestyle in this unparalleled five-bedroom penthouse that epitomizes luxury living. Spanning across expansive living spaces, this residence offers an exclusive retreat in the sky. Its grandeur is complemented by breathtaking panoramic views visible from every corner of the home. Indulge in the opulence of the private terrace, perfect for hosting lavish gatherings or enjoying serene moments amidst the bustling cityscape. Nestled in an exclusive enclave, this property not only ensures privacy but also grants access to a suite of high-end amenities, setting the stage for an extraordinary living experience tailored for those with a penchant for the finer things in life.",
                AdvertiserId = 1,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 7,
                NumberOfRooms = 3,
                Size = 90,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 280000,
                Description =
                    "Elegant townhouse with modern comforts. Welcome to a refined living experience within this meticulously designed three-bedroom townhouse. Blending elegance with modern functionality, this residence boasts contemporary interiors accentuated by high-quality finishes. The thoughtful layout optimizes space and comfort, providing an inviting atmosphere for residents. Revel in the convenience of a private garage, fostering both security and convenience. Set in a serene neighborhood, this townhouse offers proximity to essential amenities, ensuring a harmonious balance between modern living and comfort. Ideal for those who appreciate the nuances of sophisticated living in a setting that exudes both style and practicality.",
                AdvertiserId = 2,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 8,
                NumberOfRooms = 2,
                Size = 60,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 200000,
                Description =
                    "Contemporary two-bedroom apartment in a thriving locale. Embrace modern urban living in this meticulously designed two-bedroom apartment. Every corner of this space exudes contemporary elegance and functionality, offering residents a comfortable yet stylish lifestyle. The thoughtfully furnished interior is complemented by high-quality finishes, providing a cozy and inviting atmosphere. Situated in a bustling neighborhood, this residence provides convenient access to shopping centers, entertainment venues, and transportation hubs, making it an ideal choice for those seeking a modern and vibrant urban experience.",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 9,
                NumberOfRooms = 6,
                Size = 300,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 600000,
                Description =
                    "Exquisite six-bedroom mansion with breathtaking landscapes. Discover the epitome of luxury living in this palatial six-bedroom mansion nestled amidst breathtaking landscapes. The grandeur of this residence is complemented by its meticulously landscaped gardens and serene surroundings. The interiors exude elegance and sophistication, featuring spacious living areas, opulent bedrooms, and state-of-the-art amenities. Boasting expansive outdoor spaces and panoramic views, this property offers an unparalleled retreat for those seeking the utmost in comfort and exclusivity.",
                AdvertiserId = 2,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 10,
                NumberOfRooms = 4,
                Size = 120,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 320000,
                Description =
                    "Modern four-bedroom villa with scenic vistas. Step into the contemporary charm of this four-bedroom villa offering an idyllic blend of modern design and natural beauty. The open-plan layout seamlessly integrates indoor and outdoor spaces, allowing residents to enjoy the picturesque surroundings. This residence boasts stylish interiors, spacious rooms, and top-notch amenities. Nestled in a tranquil setting, it provides easy access to recreational areas and essential facilities, making it an ideal retreat for those seeking a perfect harmony between modern living and nature's tranquility.",
                AdvertiserId = 1,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 11,
                NumberOfRooms = 3,
                Size = 80,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 250000,
                Description =
                    "Inviting three-bedroom townhouse in a serene community. Welcome to this inviting three-bedroom townhouse that embodies a perfect blend of comfort and tranquility. The thoughtfully designed interiors offer a harmonious living space, showcasing modern amenities and tasteful finishes. Enjoy the convenience of a private garage and access to communal facilities within the peaceful community. Situated in close proximity to schools, parks, and essential amenities, this townhouse ensures a serene and convenient lifestyle for families seeking a cozy abode.",
                AdvertiserId = 1,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 12,
                NumberOfRooms = 2,
                Size = 55,
                Furnished = true,
                Parking = false,
                MonthlyPrice = 180000,
                Description =
                    "Modern two-bedroom apartment with panoramic city views. Embrace modernity in this chic two-bedroom apartment that offers stunning panoramic views of the city skyline. The contemporary design and tasteful furnishings create a welcoming ambiance, ideal for urban dwellers. With its convenient location near cultural hotspots, shopping districts, and entertainment venues, this apartment caters to those seeking a trendy and vibrant city lifestyle.",
                AdvertiserId = 2,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 13,
                NumberOfRooms = 4,
                Size = 110,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 300000,
                Description =
                    "Elegant four-bedroom family home with scenic views. Discover elegance and comfort in this well-appointed four-bedroom family home. The spacious interiors are adorned with high-quality finishes and modern amenities, providing a cozy and luxurious living experience. Bask in the beauty of the surrounding landscapes from the comfort of your home, offering a perfect blend of tranquility and convenience. With its proximity to schools, parks, and essential facilities, this residence caters to the needs of a modern family seeking both comfort and style.",
                AdvertiserId = 1,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 14,
                NumberOfRooms = 2,
                Size = 65,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 190000,
                Description =
                    "Charming two-bedroom cottage with a private garden. Embrace the charm of this delightful two-bedroom cottage featuring a serene private garden. The cozy interiors offer a blend of comfort and style, complemented by tasteful furnishings. Ideal for those seeking a tranquil retreat, this cottage provides a peaceful oasis within easy reach of essential amenities and recreational areas, making it a perfect escape from the bustle of city life.",
                AdvertiserId = 2,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 15,
                NumberOfRooms = 6,
                Size = 250,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 550000,
                Description =
                    "Luxurious six-bedroom estate with resort-style amenities. Discover luxury living in this expansive six-bedroom estate offering resort-style amenities. Boasting grandeur and sophistication, this residence features spacious living areas, elegant interiors, and a myriad of top-tier facilities including a pool, spa, and landscaped gardens. Positioned in an exclusive enclave, this estate ensures privacy and tranquility while offering easy access to upscale shopping, dining, and entertainment.",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 16,
                NumberOfRooms = 3,
                Size = 85,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 270000,
                Description =
                    "Modern three-bedroom duplex in a vibrant neighborhood. Immerse yourself in modern urban living with this stylish three-bedroom duplex. The contemporary design, coupled with high-quality finishes, creates an inviting atmosphere. Enjoy the convenience of a vibrant neighborhood with trendy cafes, cultural venues, and easy access to transportation, making this duplex an ideal choice for those seeking a dynamic urban lifestyle.",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 17,
                NumberOfRooms = 4,
                Size = 120,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 320000,
                Description =
                    "Elegant four-bedroom residence with breathtaking views. Step into this exquisite four-bedroom residence that epitomizes luxury and comfort. The spacious interiors exude sophistication, adorned with high-end finishes and stylish design elements. The residence boasts a sprawling living space with magnificent views from every window, offering a sense of serenity and grandeur. The gourmet kitchen, equipped with state-of-the-art appliances, is a culinary enthusiast's dream. Retreat to the lavish master suite featuring a private balcony overlooking the scenic vistas. Nestled in an exclusive community, this residence offers access to a plethora of amenities, including a clubhouse, tennis courts, and nature trails. Experience an unparalleled lifestyle where every detail is meticulously curated to provide the utmost in luxury living.",
                AdvertiserId = 2,
                CategoryId = 3,
            },
            new Advertisement
            {
                Id = 18,
                NumberOfRooms = 3,
                Size = 95,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 280000,
                Description =
                    "Modern three-bedroom townhouse with contemporary elegance. Indulge in modern sophistication within this meticulously designed three-bedroom townhouse. The open-plan layout seamlessly integrates spacious living areas, fostering a sense of openness and fluidity. The sleek kitchen features high-end appliances and sleek cabinetry, perfect for culinary enthusiasts. Ascend the stylish staircase to discover the luxurious bedrooms, each designed to provide a relaxing retreat. The expansive windows frame picturesque views, inviting natural light into every corner. Situated in a thriving neighborhood, this townhouse offers a cosmopolitan lifestyle with easy access to cultural venues, fine dining, and recreational options.",
                AdvertiserId = 2,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 19,
                NumberOfRooms = 5,
                Size = 180,
                Furnished = true,
                Parking = true,
                MonthlyPrice = 420000,
                Description =
                    "Luxurious five-bedroom mansion with unparalleled amenities. Welcome to the pinnacle of luxury in this opulent five-bedroom mansion. Every facet of this residence exudes elegance, from the grand foyer to the meticulously landscaped grounds. The sprawling living spaces are adorned with bespoke finishes and designer touches, creating an atmosphere of refined sophistication. The expansive master suite features a spa-like en-suite bathroom and a private terrace overlooking the lush gardens. Revel in the resort-style amenities, including a swimming pool, home theater, and a state-of-the-art fitness center. Positioned in an exclusive enclave, this mansion offers the utmost in privacy while providing easy access to elite shopping districts, fine dining, and entertainment.",
                AdvertiserId = 1,
                CategoryId = 1,
            },
            new Advertisement
            {
                Id = 20,
                NumberOfRooms = 1,
                Size = 40,
                Furnished = true,
                Parking = false,
                MonthlyPrice = 160000,
                Description = "Cozy one-room apartment in a tranquil setting. Embrace comfort and simplicity in this cozy one-room apartment, perfect for individuals seeking a peaceful retreat. The tastefully furnished interior offers a warm and inviting ambiance, providing a comfortable living space. Situated in a serene locale, this apartment provides a quiet environment while remaining in close proximity to essential amenities, making it an ideal choice for those valuing tranquility.",
                AdvertiserId = 1,
                CategoryId = 2,
            },
            new Advertisement
            {
                Id = 21,
                NumberOfRooms = 1,
                Size = 45,
                Furnished = false,
                Parking = true,
                MonthlyPrice = 140000,
                Description = "Compact one-room studio with modern conveniences. Discover modern living in this compact yet efficiently designed one-room studio. The smart layout maximizes space, offering functionality without compromising style. Located in a convenient neighborhood with easy access to public transportation and local amenities, this studio caters to individuals seeking a contemporary and accessible living space.",
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
                Region = "Borsod-Abaúj-Zemplén",
                PostalCode = 3525,
                City = "Miskolc",
                StreetName = "Szent István tér",
                AdvertisementId = 2
            },
            new Address
            {
                Id = 3,
                Region = "Hajdú-Bihar",
                PostalCode = 4024,
                City = "Debrecen",
                StreetName = "Piac utca",
                StreetNumber = "9.",
                AdvertisementId = 3
            },
            new Address
            {
                Id = 4,
                Region = "Szabolcs-Szatmár-Bereg",
                PostalCode = 4400,
                City = "Nyíregyháza",
                StreetName = "Bem tér",
                AdvertisementId = 4
            },
            new Address
            {
                Id = 5,
                Region = "Somogy",
                PostalCode = 7400,
                City = "Kaposvár",
                StreetName = "Ady Endre út",
                StreetNumber = "12.",
                UnitNumber = "4.",
                AdvertisementId = 5
            },
            new Address
            {
                Id = 6,
                Region = "Baranya",
                PostalCode = 7621,
                City = "Pécs",
                StreetName = "Szent István tér",
                AdvertisementId = 6
            },
            new Address
            {
                Id = 7,
                Region = "Győr-Moson-Sopron",
                PostalCode = 9021,
                City = "Győr",
                StreetName = "Kossuth tér",
                StreetNumber = "3.",
                AdvertisementId = 7
            },
            new Address
            {
                Id = 8,
                Region = "Csongrád",
                PostalCode = 6720,
                City = "Szeged",
                StreetName = "Petőfi Sándor sugárút",
                AdvertisementId = 8
            },
            new Address
            {
                Id = 9,
                Region = "Heves",
                PostalCode = 3300,
                City = "Eger",
                StreetName = "Dobó tér",
                StreetNumber = "1.",
                UnitNumber = "5.",
                AdvertisementId = 9
            },
            new Address
            {
                Id = 10,
                Region = "Veszprém",
                PostalCode = 8200,
                City = "Veszprém",
                StreetName = "Vár utca",
                AdvertisementId = 10
            },
            new Address
            {
                Id = 11,
                Region = "Zala",
                PostalCode = 8900,
                City = "Zalaegerszeg",
                StreetName = "Széchenyi tér",
                StreetNumber = "7.",
                UnitNumber = "2.",
                AdvertisementId = 11
            },
            new Address
            {
                Id = 12,
                Region = "Békés",
                PostalCode = 5600,
                City = "Békéscsaba",
                StreetName = "Szent István tér",
                AdvertisementId = 12
            },
            new Address
            {
                Id = 13,
                Region = "Bács-Kiskun",
                PostalCode = 6000,
                City = "Kecskemét",
                StreetName = "Kossuth tér",
                StreetNumber = "10.",
                UnitNumber = "3.",
                AdvertisementId = 13
            },
            new Address
            {
                Id = 14,
                Region = "Tolna",
                PostalCode = 7100,
                City = "Szekszárd",
                StreetName = "Arany János utca",
                AdvertisementId = 14
            },
            new Address
            {
                Id = 15,
                Region = "Komárom-Esztergom",
                PostalCode = 2800,
                City = "Tatabánya",
                StreetName = "Bajcsy-Zsilinszky út",
                StreetNumber = "5.",
                UnitNumber = "1.",
                AdvertisementId = 15
            },
            new Address
            {
                Id = 16,
                Region = "Fejér",
                PostalCode = 8000,
                City = "Székesfehérvár",
                StreetName = "Fő utca",
                AdvertisementId = 16
            },
            new Address
            {
                Id = 17,
                Region = "Pest",
                PostalCode = 1101,
                City = "Budapest",
                District = "XX.",
                StreetName = "József Attila utca",
                StreetNumber = "32.",
                UnitNumber = "7.",
                AdvertisementId = 17
            },
            new Address
            {
                Id = 18,
                Region = "Vas",
                PostalCode = 9700,
                City = "Szombathely",
                StreetName = "Kossuth Lajos utca",
                AdvertisementId = 18
            },
            new Address
            {
                Id = 19,
                Region = "Hajdú-Bihar",
                PostalCode = 4030,
                City = "Debrecen",
                StreetName = "Piac utca",
                StreetNumber = "22.",
                UnitNumber = "4.",
                AdvertisementId = 19
            },
            new Address
            {
                Id = 20,
                Region = "Borsod-Abaúj-Zemplén",
                PostalCode = 3527,
                City = "Miskolc",
                StreetName = "Kölcsey Ferenc út",
                AdvertisementId = 20
            },
            new Address
            {
                Id = 21,
                Region = "Budapest",
                PostalCode = 1132,
                City = "Budapest",
                District = "XIII.",
                StreetName = "Váci út",
                StreetNumber = "12.",
                UnitNumber = "2.",
                AdvertisementId = 21
            }
        );

        for (int i = 0; i < AdvertisementCount; i++)
        {
            
        }

        return modelBuilder;
    }

    private static byte[] GetImageAsBytes(string filePath)
    {
        using var fs = new FileStream(filePath, FileMode.Open, FileAccess.Read);
        using var br = new BinaryReader(fs);

        var fileBytes = br.ReadBytes((int)fs.Length);

        return fileBytes;
    }
}