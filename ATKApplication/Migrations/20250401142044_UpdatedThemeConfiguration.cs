using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedThemeConfiguration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Themes");

            migrationBuilder.InsertData(
                table: "Themes",
                columns: new[] { "Id", "Code", "Description" },
                values: new object[] { new Guid("0890e272-8dcd-4d2e-b8fb-d64f8e9387dd"), "5.9", "«Анализ эффективности реализации общепрофилактических, адресных, индивидуальных и информационно-пропагандистских мероприятий с учетом результатов проводимых социальных исследований, мониторингов общественно-политических процессов и информационных интересов населения, прежде всего молодежи»" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Themes",
                keyColumn: "Id",
                keyValue: new Guid("0890e272-8dcd-4d2e-b8fb-d64f8e9387dd"));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Themes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
