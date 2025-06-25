using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChanegEREventForm1AndSupport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventsForm1_Supports_SupportId",
                table: "EventsForm1");

            migrationBuilder.DropForeignKey(
                name: "FK_Supports_EventsBase_EventId",
                table: "Supports");

            migrationBuilder.DropIndex(
                name: "IX_Supports_EventId",
                table: "Supports");

            migrationBuilder.DropIndex(
                name: "IX_EventsForm1_SupportId",
                table: "EventsForm1");

            migrationBuilder.DropColumn(
                name: "SupportId",
                table: "EventsForm1");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<Guid>(
                name: "SupportId",
                table: "EventsForm1",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Supports_EventId",
                table: "Supports",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsForm1_SupportId",
                table: "EventsForm1",
                column: "SupportId");

            migrationBuilder.AddForeignKey(
                name: "FK_EventsForm1_Supports_SupportId",
                table: "EventsForm1",
                column: "SupportId",
                principalTable: "Supports",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Supports_EventsBase_EventId",
                table: "Supports",
                column: "EventId",
                principalTable: "EventsBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
