using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedAudienceTable2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audiences_EventsBase_EventId",
                table: "Audiences");

            migrationBuilder.DropForeignKey(
                name: "FK_Audiences_EventsForm1_EventForm1Id",
                table: "Audiences");

            migrationBuilder.DropIndex(
                name: "IX_Audiences_EventForm1Id",
                table: "Audiences");

            migrationBuilder.DropColumn(
                name: "EventForm1Id",
                table: "Audiences");

            migrationBuilder.AddForeignKey(
                name: "FK_Audiences_EventsForm1_EventId",
                table: "Audiences",
                column: "EventId",
                principalTable: "EventsForm1",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audiences_EventsForm1_EventId",
                table: "Audiences");

            migrationBuilder.AddColumn<Guid>(
                name: "EventForm1Id",
                table: "Audiences",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Audiences_EventForm1Id",
                table: "Audiences",
                column: "EventForm1Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Audiences_EventsBase_EventId",
                table: "Audiences",
                column: "EventId",
                principalTable: "EventsBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Audiences_EventsForm1_EventForm1Id",
                table: "Audiences",
                column: "EventForm1Id",
                principalTable: "EventsForm1",
                principalColumn: "Id");
        }
    }
}
