using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ChangedDeleteBehaviorAtOrganization : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EventsBase_Organizations_OrganizerId",
                table: "EventsBase");

            migrationBuilder.AddForeignKey(
                name: "FK_EventsBase_Organizations_OrganizerId",
                table: "EventsBase",
                column: "OrganizerId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddForeignKey(
                name: "FK_EventsBase_Organizations_OrganizerId",
                table: "EventsBase",
                column: "OrganizerId",
                principalTable: "Organizations",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
