using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedDepOrganizationsToSurgutAndNefteyugansk : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("2d97e3e2-441e-4711-bfae-ac7ad1152d3f"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("95c5aaaf-df23-4ed0-86f4-f189ad41ef49"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("c5b9de2f-5766-44e1-aa67-3621c55fa737"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("e3f6932c-5e56-45bd-a1b5-f4c066f1ff0a"));

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("010d3e4b-13ca-44de-9c5b-c711de58cb23"), "Nefteyugansk", "nefteyugansk_dep_sport", "$2a$11$NMISmGQm26JkVgNVpgh6xOFsOjLWKC2O0L97TsYQJqio9lLkd65AW", 0 },
                    { new Guid("1ee4b89f-67ed-43e5-8772-da74ca83ab41"), "Nefteyugansk", "nefteyugansk_dep_young", "$2a$11$RfRtpjbsu3li/z/Tx8nOWOoJhv2CFAQxCV0OfKv.Y/qH/3h98y0rq", 0 },
                    { new Guid("24154842-4b88-4e32-b1b1-55bca1328187"), "Khanty_mansiysk", "khanty_mansiysk_dep_young", "$2a$11$4TGXIGVJeAFQZrrS16Pt/O7mz0LE0X8xc6gnnRYlk5s1iOiNYCOfO", 0 },
                    { new Guid("4ac4c21b-33d6-4770-9979-ae3339d9dc27"), "Surgut", "surgut_dep_culture", "$2a$11$VK475lPT9irjskZP9pjB7OjCSCOKCC8tQscUHDDi3tpvxDw9rmAkO", 0 },
                    { new Guid("6855f310-60e6-4102-8e76-579bb6804a84"), "Surgut", "surgut_dep_young", "$2a$11$fOaqISL6G3Op73nrA4uwMeedz1fbKPVlMNqJgjBAmZp.A6a7eP/46", 0 },
                    { new Guid("6f318c5e-5800-4a35-b73a-1d66332427ce"), "Khanty_mansiysk", "khanty_mansiysk_dep_culture", "$2a$11$S6qUfm6Ebe59gsEFglyZG.62YLlXmbfV2UQVGZAsC2QCFgAOLb.iy", 0 },
                    { new Guid("87f2e33b-5fec-4304-807f-fff592846ea7"), "Khanty_mansiysk", "khanty_mansiysk_dep_sport", "$2a$11$BaqJBaP/80oqNbHfrKFl7.Ckxh7yEJVOQq8I.BISsowXZBeXA.UM2", 0 },
                    { new Guid("899178e2-fdaf-4ed1-ba58-ec53f443956e"), "Surgut", "surgut_dep_sport", "$2a$11$ImjyHGzG950o3Azw2dD80eIWWZdrZo3yu1GxfjpfzoqAy9aEy684K", 0 },
                    { new Guid("dcdc2b4c-7fc5-4422-ba42-9d302adec76f"), "Nefteyugansk", "nefteyugansk_dep_education", "$2a$11$GsgmFnKCwaZpra3f8BufYe313RA9RsP9iZdqQYhLHfC1nLbKdgfPK", 0 },
                    { new Guid("f9ed09be-2067-4915-9c56-b8d829089ec4"), "Khanty_mansiysk", "khanty_mansiysk_dep_education", "$2a$11$WiBuwZvfbr5VYT58dxFgmeDWaHHs9TAFb5SAzOR7RMIPNQCzNRVi.", 0 },
                    { new Guid("fc858a1f-760c-4e55-815e-b51a8f2e6997"), "Nefteyugansk", "nefteyugansk_dep_culture", "$2a$11$ofrP6zCXwuKf6GsroIaTFeeeBVJQlwFWA7EXP2WWpZnd12PnzM6t2", 0 },
                    { new Guid("fe3f5500-8432-41cb-80b7-24098231b455"), "Surgut", "surgut_dep_education", "$2a$11$Xol8Cj8oUI.GVu5VTZ9UPePyA1ZF7gB06j9rfkNiFeu2b.r6pgUJe", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("010d3e4b-13ca-44de-9c5b-c711de58cb23"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("1ee4b89f-67ed-43e5-8772-da74ca83ab41"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("24154842-4b88-4e32-b1b1-55bca1328187"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("4ac4c21b-33d6-4770-9979-ae3339d9dc27"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("6855f310-60e6-4102-8e76-579bb6804a84"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("6f318c5e-5800-4a35-b73a-1d66332427ce"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("87f2e33b-5fec-4304-807f-fff592846ea7"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("899178e2-fdaf-4ed1-ba58-ec53f443956e"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("dcdc2b4c-7fc5-4422-ba42-9d302adec76f"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("f9ed09be-2067-4915-9c56-b8d829089ec4"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("fc858a1f-760c-4e55-815e-b51a8f2e6997"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("fe3f5500-8432-41cb-80b7-24098231b455"));

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("2d97e3e2-441e-4711-bfae-ac7ad1152d3f"), "Khanty_mansiysk", "khanty_mansiysk_dep_culture", "$2a$11$Mw0OTLLStAnCTWGksnDR7uprjXg/OahOpl6sXNR1D4ULnsvQ4NG0S", 0 },
                    { new Guid("95c5aaaf-df23-4ed0-86f4-f189ad41ef49"), "Khanty_mansiysk", "khanty_mansiysk_dep_sport", "$2a$11$H/s.7XfLnN3UGk8YrFYI7u7x0yVNWBxRE4ruZAMDHFqpQLCsLmNXS", 0 },
                    { new Guid("c5b9de2f-5766-44e1-aa67-3621c55fa737"), "Khanty_mansiysk", "khanty_mansiysk_dep_young", "$2a$11$KP56VfYuJ2r3Ygn2ztppYOnEq1W02d7bXzjAIG22HBPUa/vW4djxy", 0 },
                    { new Guid("e3f6932c-5e56-45bd-a1b5-f4c066f1ff0a"), "Khanty_mansiysk", "khanty_mansiysk_dep_education", "$2a$11$k5iNENz/nFpOe2ckyJ2HZuMXPGm.r4WFCs20pfaeVLSbLfqK0KRSu", 0 }
                });
        }
    }
}
