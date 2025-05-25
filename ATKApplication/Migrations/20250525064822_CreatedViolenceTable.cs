using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class CreatedViolenceTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Direct",
                table: "EventsForm3");

            migrationBuilder.DropColumn(
                name: "Result",
                table: "EventsForm3");

            migrationBuilder.RenameColumn(
                name: "MaterialsCount",
                table: "EventsForm3",
                newName: "SendTotal");

            migrationBuilder.AddColumn<int>(
                name: "BlockedTotal",
                table: "EventsForm3",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Violations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Send = table.Column<int>(type: "integer", nullable: false),
                    Blocked = table.Column<int>(type: "integer", nullable: false),
                    Order = table.Column<string>(type: "text", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Violations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Violations_EventsForm3_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsForm3",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Violations_EventId",
                table: "Violations",
                column: "EventId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Violations");

            migrationBuilder.DropColumn(
                name: "BlockedTotal",
                table: "EventsForm3");

            migrationBuilder.RenameColumn(
                name: "SendTotal",
                table: "EventsForm3",
                newName: "MaterialsCount");

            migrationBuilder.AddColumn<string>(
                name: "Direct",
                table: "EventsForm3",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Result",
                table: "EventsForm3",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
