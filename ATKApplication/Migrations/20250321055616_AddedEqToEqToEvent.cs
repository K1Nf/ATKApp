using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class AddedEqToEqToEvent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EqualToEqualDescription",
                table: "Events",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EqualToEqualDescription",
                table: "Events");
        }
    }
}
