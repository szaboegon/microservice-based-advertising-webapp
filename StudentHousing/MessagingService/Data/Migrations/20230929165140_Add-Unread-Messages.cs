using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MessagingService.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddUnreadMessages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "timeStamp",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 9, 29, 18, 51, 40, 293, DateTimeKind.Local).AddTicks(681),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 5, 10, 10, 3, 18, 622, DateTimeKind.Local).AddTicks(3274));

            migrationBuilder.AddColumn<bool>(
                name: "isUnread",
                table: "Messages",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isUnread",
                table: "Messages");

            migrationBuilder.AlterColumn<DateTime>(
                name: "timeStamp",
                table: "Messages",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 5, 10, 10, 3, 18, 622, DateTimeKind.Local).AddTicks(3274),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 9, 29, 18, 51, 40, 293, DateTimeKind.Local).AddTicks(681));
        }
    }
}
