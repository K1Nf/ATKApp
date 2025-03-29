using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class PlanFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Plans_PlanId",
                table: "Events");

            migrationBuilder.DropIndex(
                name: "IX_Events_PlanId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Plans");

            migrationBuilder.DropColumn(
                name: "PlanId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Events");

            migrationBuilder.RenameColumn(
                name: "IsEffective",
                table: "Events",
                newName: "IsSystematic");

            migrationBuilder.AlterColumn<string>(
                name: "EqualToEqualDescription",
                table: "Events",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "IsSystematic",
                table: "Events",
                newName: "IsEffective");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Plans",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "EqualToEqualDescription",
                table: "Events",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PlanId",
                table: "Events",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Events",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Events_PlanId",
                table: "Events",
                column: "PlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Plans_PlanId",
                table: "Events",
                column: "PlanId",
                principalTable: "Plans",
                principalColumn: "Id");
        }
    }
}
