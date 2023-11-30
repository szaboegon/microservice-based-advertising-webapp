using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdvertisingService.DataAccess.DAL.Migrations
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
                    uploadDate = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2023, 11, 30, 12, 57, 23, 555, DateTimeKind.Local).AddTicks(5876)),
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
                    streetNumber = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
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
