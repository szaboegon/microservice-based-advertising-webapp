using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AdvertisingService.DataAccess.DAL.Migrations
{
    /// <inheritdoc />
    public partial class MakeStreetNumberOptional : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "uploadDate",
                table: "Advertisements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.AlterColumn<string>(
                name: "streetNumber",
                table: "Addresses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10);

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 1,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 2,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 3,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 4,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 5,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 6,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 7,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 8,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 9,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 10,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 11,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 12,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 13,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 14,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 15,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 16,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 17,
                column: "uploadDate",
                value: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "uploadDate",
                table: "Advertisements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 10, 16, 20, 37, 7, 430, DateTimeKind.Local).AddTicks(9942));

            migrationBuilder.AlterColumn<string>(
                name: "streetNumber",
                table: "Addresses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(10)",
                oldMaxLength: 10,
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 1,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 2,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 3,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 4,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 5,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 6,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 7,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 8,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 9,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 10,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 11,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 12,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 13,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 14,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 15,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 16,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));

            migrationBuilder.UpdateData(
                table: "Advertisements",
                keyColumn: "id",
                keyValue: 17,
                column: "uploadDate",
                value: new DateTime(2023, 9, 15, 8, 57, 57, 712, DateTimeKind.Local).AddTicks(3788));
        }
    }
}
