using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class AddedDescriptionToTheme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Themes",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Themes");
        }
    }
}
