using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedResultColumnInAgreement : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Result",
                table: "Agreements",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Result",
                table: "Agreements");
        }
    }
}
