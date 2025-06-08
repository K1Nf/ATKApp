using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class AddedDepOrganizations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("1458af80-3acb-4e89-a2c0-f1703fd6ae33"), "Khanty_mansiysk", "khanty_mansiysk_dep_education", "$2a$11$wPnd.Y8sxkwDuYjwE7FVvufi/ZZXDnKL1fn6Noy0VbI4/HaXk9Xbi", 0 },
                    { new Guid("16d61372-15bb-467a-9339-d2166eb70b40"), "Khanty_mansiysk", "khanty_mansiysk_dep_culture", "$2a$11$fwT0rA4JYNQ8TUvAhRr.leOp25zJZ5JRJd4RURaDk4K4JQ3WIGQiS", 0 },
                    { new Guid("94677569-272b-47c8-a77f-16f516f2a0c8"), "Khanty_mansiysk", "khanty_mansiysk_dep_young", "$2a$11$HoYxxRB7z.vRIk5aBpTDZ.BVmn2r9Joy/l51WyOAF4nESdkAzbS3S", 0 },
                    { new Guid("f2d3116a-c17f-4a0f-ae31-b9f34dede6f8"), "Khanty_mansiysk", "khanty_mansiysk_dep_sport", "$2a$11$SLtgf9sPIf7NsZHKy1ni/uBC1LehywyskkAZxjipwF70y/KorABHm", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("1458af80-3acb-4e89-a2c0-f1703fd6ae33"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("16d61372-15bb-467a-9339-d2166eb70b40"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("94677569-272b-47c8-a77f-16f516f2a0c8"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("f2d3116a-c17f-4a0f-ae31-b9f34dede6f8"));

            
        }
    }
}
