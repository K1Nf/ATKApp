using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CreatedSomeOrganizations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Organizations",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<string>(
                name: "Municipality",
                table: "Organizations",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("062533d7-3ae2-4a0e-aeba-22f2bb780869"), "noMunicipality", "atk_beloyarskiy_rayon", "$2a$11$FIDoI11YlVrwMLECTJortezjWL0h8ghqEb6/7ywTCTVt8ptYBsM0q", 0 },
                    { new Guid("17cd8a76-05f4-46a5-977e-a7866293a6fd"), "Nizhnevartovskiy_rayon", "atk_nizhnevartovskiy_rayon", "$2a$11$goKhqAtBrIx.JhT/dDVEcOgrdG8szXApDIHwgz7JDq34wr2xdvsSe", 0 },
                    { new Guid("26dffba8-ea9a-42d4-94a1-0ee6a84c1ba4"), "Langepas", "atk_langepas", "$2a$11$DLolohS7wFI/rcAesoSbSu0ELR/WzCQjzDHncygk7ibKfRVAtTrNS", 0 },
                    { new Guid("2a80eaf9-2243-42b5-b203-a49072795feb"), "Yugorsk", "atk_yugorsk", "$2a$11$McWy.lsVGQ8jv4GRHPOQt.uxWutpsCuYKJrCIYMjMRtbK6TvuWdr.", 0 },
                    { new Guid("4af6717f-6b11-463e-90ea-d53d7b370ed8"), "noMunicipality", "atk_khmao", "$2a$11$9WjBSF5r.7lkG8n214Az7OAcqWoq52HJ7qyScbE7gQfWMUzEVmbVi", 0 },
                    { new Guid("59b14994-a37f-4d17-a57d-b00bfb1d7831"), "Oktyabrskiy_rayon", "atk_oktyabrskiy_rayon", "$2a$11$SMdmVo6Yy0753UvAPPMTMeGyCz.hI4FyZI.Yg58oc7Nk7A4kfDhvG", 0 },
                    { new Guid("6235294e-ae26-483e-bfb2-ab3279358cde"), "Surgutskiy_rayon", "atk_surgutskiy_rayon", "$2a$11$0nnWMGX9pkYi5JN1S9z1WeyVzr8q2zcX7O2YMA9KJ/RMelKofSTFa", 0 },
                    { new Guid("6916e17f-3fc1-4f0b-b602-843b43c4b913"), "Nyagan", "atk_nyagan", "$2a$11$i9cfjXU90JSSUj7tPzeG7.rBnGwK59r5i8eZ.mKqmHXhYRJcWRYeW", 0 },
                    { new Guid("6c65dc07-d247-4698-b754-7db0cb0d65e5"), "Pokachi", "atk_pokachi", "$2a$11$E6IfvrOGBQ/nCo2V8kO0fejVYIOfCy2VGmRdG.eZ6eRNXFU.MFPVi", 0 },
                    { new Guid("7e0024fb-67d4-4e9b-bcbe-036c1fcdc940"), "Nizhnevartovsk", "atk_nizhnevartovsk", "$2a$11$mRZ.TCsb.iFfx6RI7.07i.lzA.JwnAJlPkNWvrQuapXaJ3shvJBeS", 0 },
                    { new Guid("8fbc54b4-f114-4d99-9009-298025bdca85"), "Surgut", "atk_surgut", "$2a$11$wJvobiQSvZZuzUIdp/EwPOa6w1/ednuQkLvjp41M3olUIBQMTSsUW", 0 },
                    { new Guid("a1cf85da-df78-46fa-9602-9dc410696c62"), "Khanty_mansiyskiy_rayon", "atk_khanty_mansiyskiy_rayon", "$2a$11$yb3Y4i6LBWHl3odoG5ApaeU8GgsTfIg6e9kQ1U4WOYZSho7nAOgI.", 0 },
                    { new Guid("ab3652da-05d6-47e1-9580-89e32055eaec"), "Nefteyuganskiy_rayon", "atk_nefteyuganskiy_rayon", "$2a$11$T0Bki4k.snJHXoLsr1h2X.Ua30XtZyBNKDQExDlc2hjnreD3XcSjO", 0 },
                    { new Guid("af85000e-4a6a-4989-8874-2b2cd2a0a7e6"), "Pyth_yach", "atk_pyth_yach", "$2a$11$K4oZHAC7kiCNmu1MnWrBXuJmutIzK87A4i65xTUMJAxmHKPBq4iEG", 0 },
                    { new Guid("b1c97216-803f-43d7-b9b3-6eb29910817c"), "Berezovskiy_rayon", "atk_berezovskiy_rayon", "$2a$11$QAAoGntTQtDrdLndtyHtPeV.b1lO2ID5UE3UGGGOGNbusB.gDj2Ei", 0 },
                    { new Guid("bc0368c9-ebb6-47be-8a63-0cd37194c15b"), "Kogalym", "atk_kogalym", "$2a$11$cTbg.xa4Tc4k/J3ju1L0ZOimgsux1431RkQKt27VsIgRSmKq85bde", 0 },
                    { new Guid("bd8bc538-3257-49e6-aedd-a49e97306e91"), "Megion", "atk_megion", "$2a$11$hK2ya/4eYnHRCtdFihXhhOL7SjPwzhuM0Kj.30fkQlZbillqWZEdi", 0 },
                    { new Guid("c388d5a9-70a2-4f30-a62c-ef39f8747a95"), "Condinskiy_rayon", "atk_condinskiy_rayon", "$2a$11$W4vOBtx2NjZPooVQzdZs/.QNlJD9VAMDuMASbJnkwdtsb3sqV2J6O", 0 },
                    { new Guid("cb89e189-fd3e-4ec8-a5f2-9c62fc639c65"), "Khanty_mansiysk", "atk_khanty_mansiysk", "$2a$11$KHHNIcd8JT0tCyZb22PSI.sMgvncMnRb0fsHC9PoKaVEELyvLiJuq", 0 },
                    { new Guid("d4afccd9-4370-4c0c-880d-0fb9578cf6ac"), "Sovietskiy_rayon", "atk_sovietskiy_rayon", "$2a$11$p8nzAFIlOftI98.UwCVykeVpLeurbuRpvBNYilrPIN07hS22X687G", 0 },
                    { new Guid("db620bb9-ee2b-4f73-a6d6-361449b140ce"), "Nefteyugansk", "atk_nefteyugansk", "$2a$11$vSSkpO.K3hMphcMQieu8lOIfLTF4YHSklemFf5azj9dPyBirzdtLW", 0 },
                    { new Guid("ed9c870d-8003-44c4-8c5e-e02b01f65815"), "Urai", "atk_urai", "$2a$11$.R.RIlfiRryoOSBpfwv4F.31lT1Gfj8O96w/lOVp.MHjPqEIRZviS", 0 },
                    { new Guid("fd756369-b334-41bb-b7b8-410b91987bf0"), "Raduzhnyi", "atk_raduzhnyi", "$2a$11$I64nfsD7DYsVNqC91GAAx.SAuEnbBNSnoP98rvbcwBBDjpxQqvRJa", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("062533d7-3ae2-4a0e-aeba-22f2bb780869"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("17cd8a76-05f4-46a5-977e-a7866293a6fd"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("26dffba8-ea9a-42d4-94a1-0ee6a84c1ba4"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("2a80eaf9-2243-42b5-b203-a49072795feb"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("4af6717f-6b11-463e-90ea-d53d7b370ed8"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("59b14994-a37f-4d17-a57d-b00bfb1d7831"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("6235294e-ae26-483e-bfb2-ab3279358cde"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("6916e17f-3fc1-4f0b-b602-843b43c4b913"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("6c65dc07-d247-4698-b754-7db0cb0d65e5"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("7e0024fb-67d4-4e9b-bcbe-036c1fcdc940"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("8fbc54b4-f114-4d99-9009-298025bdca85"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("a1cf85da-df78-46fa-9602-9dc410696c62"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("ab3652da-05d6-47e1-9580-89e32055eaec"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("af85000e-4a6a-4989-8874-2b2cd2a0a7e6"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("b1c97216-803f-43d7-b9b3-6eb29910817c"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("bc0368c9-ebb6-47be-8a63-0cd37194c15b"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("bd8bc538-3257-49e6-aedd-a49e97306e91"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("c388d5a9-70a2-4f30-a62c-ef39f8747a95"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("cb89e189-fd3e-4ec8-a5f2-9c62fc639c65"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("d4afccd9-4370-4c0c-880d-0fb9578cf6ac"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("db620bb9-ee2b-4f73-a6d6-361449b140ce"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("ed9c870d-8003-44c4-8c5e-e02b01f65815"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("fd756369-b334-41bb-b7b8-410b91987bf0"));

            migrationBuilder.DropColumn(
                name: "Municipality",
                table: "Organizations");

            migrationBuilder.AlterColumn<int>(
                name: "Rating",
                table: "Organizations",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);
        }
    }
}
