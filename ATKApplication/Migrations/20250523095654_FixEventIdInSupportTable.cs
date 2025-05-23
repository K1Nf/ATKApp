using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class FixEventIdInSupportTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Supports_EventsForm1_EventForm1Id",
                table: "Supports");

            migrationBuilder.DropIndex(
                name: "IX_Supports_EventForm1Id",
                table: "Supports");

            migrationBuilder.DropColumn(
                name: "EventForm1Id",
                table: "Supports");

            migrationBuilder.CreateIndex(
                name: "IX_Supports_EventId",
                table: "Supports",
                column: "EventId");

            migrationBuilder.AddForeignKey(
                name: "FK_Supports_EventsForm1_EventId",
                table: "Supports",
                column: "EventId",
                principalTable: "EventsForm1",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Supports_EventsForm1_EventId",
                table: "Supports");

            migrationBuilder.DropIndex(
                name: "IX_Supports_EventId",
                table: "Supports");

            migrationBuilder.AddColumn<Guid>(
                name: "EventForm1Id",
                table: "Supports",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Supports_EventForm1Id",
                table: "Supports",
                column: "EventForm1Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Supports_EventsForm1_EventForm1Id",
                table: "Supports",
                column: "EventForm1Id",
                principalTable: "EventsForm1",
                principalColumn: "Id");
        }
    }
}
