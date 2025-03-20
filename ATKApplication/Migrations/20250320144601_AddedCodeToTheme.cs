using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class AddedCodeToTheme : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_InterAgencyCooperations_Organizations_OrganizationId",
                table: "InterAgencyCooperations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_InterAgencyCooperations",
                table: "InterAgencyCooperations");

            migrationBuilder.DropIndex(
                name: "IX_InterAgencyCooperations_OrganizationId",
                table: "InterAgencyCooperations");

            migrationBuilder.DropColumn(
                name: "OrganizationId",
                table: "InterAgencyCooperations");

            migrationBuilder.DropColumn(
                name: "FeedBackType",
                table: "FeedBacks");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "Content",
                table: "InterAgencyCooperations",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "OrganizerId",
                table: "InterAgencyCooperations",
                newName: "Id");

            migrationBuilder.AddColumn<string>(
                name: "Code",
                table: "Themes",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "InterAgencyCooperations",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Organization",
                table: "InterAgencyCooperations",
                type: "text",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "FeedBacks",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<bool>(
                name: "HasGuestionnaire",
                table: "FeedBacks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasInternet",
                table: "FeedBacks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasInterview",
                table: "FeedBacks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasOpros",
                table: "FeedBacks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "HasOther",
                table: "FeedBacks",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddPrimaryKey(
                name: "PK_InterAgencyCooperations",
                table: "InterAgencyCooperations",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_InterAgencyCooperations",
                table: "InterAgencyCooperations");

            migrationBuilder.DropColumn(
                name: "Code",
                table: "Themes");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "InterAgencyCooperations");

            migrationBuilder.DropColumn(
                name: "Organization",
                table: "InterAgencyCooperations");

            migrationBuilder.DropColumn(
                name: "HasGuestionnaire",
                table: "FeedBacks");

            migrationBuilder.DropColumn(
                name: "HasInternet",
                table: "FeedBacks");

            migrationBuilder.DropColumn(
                name: "HasInterview",
                table: "FeedBacks");

            migrationBuilder.DropColumn(
                name: "HasOpros",
                table: "FeedBacks");

            migrationBuilder.DropColumn(
                name: "HasOther",
                table: "FeedBacks");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "InterAgencyCooperations",
                newName: "Content");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "InterAgencyCooperations",
                newName: "OrganizerId");

            migrationBuilder.AddColumn<Guid>(
                name: "OrganizationId",
                table: "InterAgencyCooperations",
                type: "uuid",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "FeedBacks",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "FeedBackType",
                table: "FeedBacks",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<TimeOnly>(
                name: "Time",
                table: "Events",
                type: "time without time zone",
                nullable: false,
                defaultValue: new TimeOnly(0, 0, 0));

            migrationBuilder.AddPrimaryKey(
                name: "PK_InterAgencyCooperations",
                table: "InterAgencyCooperations",
                columns: new[] { "OrganizerId", "EventId" });

            migrationBuilder.CreateIndex(
                name: "IX_InterAgencyCooperations_OrganizationId",
                table: "InterAgencyCooperations",
                column: "OrganizationId");

            migrationBuilder.AddForeignKey(
                name: "FK_InterAgencyCooperations_Organizations_OrganizationId",
                table: "InterAgencyCooperations",
                column: "OrganizationId",
                principalTable: "Organizations",
                principalColumn: "Id");
        }
    }
}
