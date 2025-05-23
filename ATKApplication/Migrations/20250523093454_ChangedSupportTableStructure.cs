using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class ChangedSupportTableStructure : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Financial",
                table: "Supports");

            migrationBuilder.DropColumn(
                name: "Information",
                table: "Supports");

            migrationBuilder.DropColumn(
                name: "Methodological",
                table: "Supports");

            migrationBuilder.DropColumn(
                name: "Organizational",
                table: "Supports");

            migrationBuilder.DropColumn(
                name: "Other",
                table: "Supports");

            migrationBuilder.RenameColumn(
                name: "SocialSupport",
                table: "Supports",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "SupportType",
                table: "Supports",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SupportType",
                table: "Supports");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Supports",
                newName: "SocialSupport");

            migrationBuilder.AddColumn<string>(
                name: "Financial",
                table: "Supports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Information",
                table: "Supports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Methodological",
                table: "Supports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organizational",
                table: "Supports",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Other",
                table: "Supports",
                type: "text",
                nullable: true);
        }
    }
}
