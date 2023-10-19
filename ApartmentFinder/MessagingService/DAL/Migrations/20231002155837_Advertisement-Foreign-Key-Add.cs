using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessagingService.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AdvertisementForeignKeyAdd : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "advertisementId",
                table: "PrivateChats",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "timeStamp",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 10, 2, 17, 58, 37, 238, DateTimeKind.Local).AddTicks(806),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 9, 29, 18, 51, 40, 293, DateTimeKind.Local).AddTicks(681));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "advertisementId",
                table: "PrivateChats");

            migrationBuilder.AlterColumn<DateTime>(
                name: "timeStamp",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 9, 29, 18, 51, 40, 293, DateTimeKind.Local).AddTicks(681),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 10, 2, 17, 58, 37, 238, DateTimeKind.Local).AddTicks(806));
        }
    }
}
