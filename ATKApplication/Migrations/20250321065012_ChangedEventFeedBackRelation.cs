using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class ChangedEventFeedBackRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FeedBacks_EventId",
                table: "FeedBacks");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBacks_EventId",
                table: "FeedBacks",
                column: "EventId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_FeedBacks_EventId",
                table: "FeedBacks");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBacks_EventId",
                table: "FeedBacks",
                column: "EventId");
        }
    }
}
