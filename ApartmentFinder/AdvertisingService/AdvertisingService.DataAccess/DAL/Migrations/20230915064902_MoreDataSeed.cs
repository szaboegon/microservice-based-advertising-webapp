using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AdvertisingService.DataAccess.Data.Migrations
{
    /// <inheritdoc />
    public partial class MoreDataSeed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Addresses",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.AlterColumn<DateTime>(
                name: "uploadDate",
                table: "Advertisements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 9, 15, 8, 49, 2, 49, DateTimeKind.Local).AddTicks(197),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 4, 22, 14, 11, 29, 736, DateTimeKind.Local).AddTicks(9345));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "uploadDate",
                table: "Advertisements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 4, 22, 14, 11, 29, 736, DateTimeKind.Local).AddTicks(9345),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 9, 15, 8, 49, 2, 49, DateTimeKind.Local).AddTicks(197));

            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "id", "name" },
                values: new object[,]
                {
                    { 1, "apartment" },
                    { 2, "room" }
                });

            migrationBuilder.InsertData(
                table: "Advertisements",
                columns: new[] { "id", "advertiserId", "categoryId", "description", "furnished", "monthlyPrice", "numberOfRooms", "parking", "size" },
                values: new object[,]
                {
                    { 1, 1, 1, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu", true, 250000, 3.0, false, 70.0 },
                    { 2, 2, 2, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibu", false, 100000, 1.0, true, 20.0 }
                });

            migrationBuilder.InsertData(
                table: "Addresses",
                columns: new[] { "id", "advertisementId", "city", "district", "postalCode", "region", "streetName", "streetNumber", "unitNumber" },
                values: new object[,]
                {
                    { 1, 1, "Budapest", "XI.", (short)1091, "Pest", "Király utca", "47.", "15." },
                    { 2, 2, "Pécs", null, (short)7600, "Baranya", "Kossuth utca", "12.", "10." }
                });
        }
    }
}
