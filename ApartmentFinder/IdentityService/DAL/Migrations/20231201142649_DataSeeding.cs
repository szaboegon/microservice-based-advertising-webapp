using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace IdentityService.DAL.Migrations
{
    /// <inheritdoc />
    public partial class DataSeeding : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Email", "EmailConfirmed", "FirstName", "LastName", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "RefreshToken", "RefreshTokenExpiry", "SecurityStamp", "TwoFactorEnabled", "UserName" },
                values: new object[,]
                {
                    { -2, 0, "d42cdfa2-daf8-4bba-b909-60c801157996", "bobsmith@example.com", false, "Bob", "Smith", false, null, "BOBSMITH@EXAMPLE.COM", "BOBSMITH", "AQAAAAIAAYagAAAAEANklXzTyzbmA91aG5Z311plcf/bR8KqfbGg456eyCFPA7iYUQd34/E/Ny9SVT9scw==", null, false, null, null, "bbeb6e83-4bdf-436b-bcad-3bc7de5657ce", false, "bobsmith" },
                    { -1, 0, "1b6991bd-3f28-4f60-8fd8-ad6458359f96", "johndoe@example.com", false, "John", "Doe", false, null, "JOHNDOE@EXAMPLE.COM", "JOHNDOE", "AQAAAAIAAYagAAAAEJEdEZF+CCuGTqQtPifgttJSbr8XUJOPuF9W4pDP7WSapX7+dLvLXbvtqr6lGZnkww==", null, false, null, null, "514a43f8-7121-463c-bac5-a78bef1f0b7b", false, "johndoe" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: -2);

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: -1);
        }
    }
}
