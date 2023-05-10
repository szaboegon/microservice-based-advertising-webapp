using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessagingService.Data.Migrations
{
    /// <inheritdoc />
    public partial class PrivateChat_UniqueName_Added : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UniqueName",
                table: "PrivateChats",
                newName: "uniqueName");

            migrationBuilder.AlterColumn<string>(
                name: "uniqueName",
                table: "PrivateChats",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "timeStamp",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 5, 10, 10, 3, 18, 622, DateTimeKind.Local).AddTicks(3274),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 5, 10, 9, 58, 7, 201, DateTimeKind.Local).AddTicks(3941));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "uniqueName",
                table: "PrivateChats",
                newName: "UniqueName");

            migrationBuilder.AlterColumn<string>(
                name: "UniqueName",
                table: "PrivateChats",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<DateTime>(
                name: "timeStamp",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 5, 10, 9, 58, 7, 201, DateTimeKind.Local).AddTicks(3941),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 5, 10, 10, 3, 18, 622, DateTimeKind.Local).AddTicks(3274));
        }
    }
}
