using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedAudienceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Audiences",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Audiences");
        }
    }
}
