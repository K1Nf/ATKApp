﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class DeletedEqualToEqualColumnFromEventForm4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EqualToEqual",
                table: "EventsForm4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "EqualToEqual",
                table: "EventsForm4",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}
