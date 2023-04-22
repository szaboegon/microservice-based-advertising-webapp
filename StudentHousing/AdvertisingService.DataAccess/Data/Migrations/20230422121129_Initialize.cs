using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AdvertisingService.DataAccess.Data.Migrations
{
    /// <inheritdoc />
    public partial class Initialize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Advertisements",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    numberOfRooms = table.Column<double>(type: "float", nullable: false),
                    size = table.Column<double>(type: "float", nullable: false),
                    furnished = table.Column<bool>(type: "bit", nullable: false),
                    parking = table.Column<bool>(type: "bit", nullable: false),
                    monthlyPrice = table.Column<int>(type: "int", nullable: false),
                    uploadDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2023, 4, 22, 14, 11, 29, 736, DateTimeKind.Local).AddTicks(9345)),
                    description = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    advertiserId = table.Column<int>(type: "int", nullable: false),
                    categoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Advertisements", x => x.id);
                    table.ForeignKey(
                        name: "FK_Advertisement_Category",
                        column: x => x.categoryId,
                        principalTable: "Categories",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "Addresses",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    region = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    postalCode = table.Column<short>(type: "smallint", nullable: false),
                    city = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    district = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    streetName = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    streetNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    unitNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    advertisementId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Addresses", x => x.id);
                    table.ForeignKey(
                        name: "FK_Address_Advertisement",
                        column: x => x.advertisementId,
                        principalTable: "Advertisements",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Images",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    data = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    advertisementId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Images", x => x.id);
                    table.ForeignKey(
                        name: "FK_Image_Advertisement",
                        column: x => x.advertisementId,
                        principalTable: "Advertisements",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateIndex(
                name: "IX_Addresses_advertisementId",
                table: "Addresses",
                column: "advertisementId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Advertisements_categoryId",
                table: "Advertisements",
                column: "categoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Images_advertisementId",
                table: "Images",
                column: "advertisementId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Addresses");

            migrationBuilder.DropTable(
                name: "Images");

            migrationBuilder.DropTable(
                name: "Advertisements");

            migrationBuilder.DropTable(
                name: "Categories");
        }
    }
}
