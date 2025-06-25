using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedSocialSupportToSupportTAble : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SocialSupport",
                table: "Supports",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SocialSupport",
                table: "Supports");
        }
    }
}
