using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddedATKOrganizations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("0faf9353-06d7-4d83-bb72-36cc77f5f9fc"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("11de291a-6a3b-462b-9b5c-bfd231f9152b"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("15579234-a515-4cb9-8a0c-b7ed5eb8ce41"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("1f507d40-fe24-499c-8df3-c43f610544ca"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("2c63ca17-d56e-418d-9f04-89863b240ecd"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("35ae5afe-4f81-41b7-85ac-d89e1c853f2d"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("44c63e81-9449-44be-bdf5-02a15e07df82"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("4dbe5794-f0cb-4ff7-905a-ff1fe08cf3f9"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("57b5522d-7777-4826-83cb-5fbad059f31c"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("5d537486-2d4e-479d-ad8c-67731eb381e4"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("61edd380-824b-4667-8268-754f9d438232"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("691df7fe-525e-4f2d-99a5-635ec2d782fd"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("730eda47-9a25-44ab-b78e-4fe3e60de058"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("80447420-65a9-4355-a811-6a21f0699930"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("811ed12f-6d7b-4dd6-be5f-3abe06e71c64"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("86d6ea84-6f58-4201-8e9a-5159bab09612"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("8d5ccab9-69b0-46b4-ac1f-1ce95866e2df"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("927c6079-3130-46ea-a168-2c4362927ff4"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("98d16169-aec6-4821-b838-85968ba1192e"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("9a61c105-92fd-4b8b-bd7e-87bdbb811281"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("9cb131f6-e751-430f-bff9-5725e69fb975"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("a59e3050-ec4a-46f2-a6e3-243dea47cc6b"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("a8019561-3cfe-4326-b72b-d27a652fbf20"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("e97e047b-8bba-4858-8bc7-7d3e1ef879a1"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("f14b0ec2-0580-4a9e-b5f8-b0554e29ec33"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("f25aee54-8726-4af7-83e6-06748debd9fb"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("f8f95e9b-1b07-468e-b72a-701431bd48e6"));

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("04c63480-40f6-4b28-a783-d3e8522222f2"), "Surgut", "atk_surgut", "$2a$11$slw0Za.tXjFtFXDClQ31KOkwgqHngjxTWcLPkkeprFGvrt.JEi28C", 0 },
                    { new Guid("19d3ff34-0f45-4929-af4e-1cd1f51b2135"), "Megion", "atk_megion", "$2a$11$wCag9GfAnjvqewGwneDdV.HTzPCaJtajp/7L4r4wPTHhBGM.j.RUC", 0 },
                    { new Guid("1cab65e5-6616-4261-98ba-ce725ca89c60"), "Pokachi", "atk_pokachi", "$2a$11$iqvGMabteitJKlDz7dUITOgdtl8iIoYq3wJLPepWie3QrMC8QW.vO", 0 },
                    { new Guid("24005700-9409-40ba-9c81-03cce7c15c07"), "Nyagan", "atk_nyagan", "$2a$11$6HUrll00RTOp6OCRI0mS7uDi9X5VhD5efDYR9COqWjgJpsbX1cjJK", 0 },
                    { new Guid("3a9be765-2c39-4764-bc22-258e3f4790ee"), "Berezovskiy_rayon", "atk_berezovskiy_rayon", "$2a$11$vewgpgGOGAEZZh0s9y1JjOIj.dlLTKGLmKM4KVtKOrfIAbdwNUfjy", 0 },
                    { new Guid("3b180850-74c9-443e-9587-901c253ae74d"), "Khanty_mansiyskiy_rayon", "atk_khanty_mansiyskiy_rayon", "$2a$11$1W4IHr8a3CAMSHJRCveTA.ZUO8RdHmLYXUTEpsvESn6AtzW0nnLna", 0 },
                    { new Guid("3f72b19f-d07f-4202-868a-017b45228425"), "Kogalym", "atk_kogalym", "$2a$11$q2prrt/bfbyKrZzFdgTJkuvlaWHGZTL1HOpbQ1OqFPUZ/RykmT0vO", 0 },
                    { new Guid("463a4829-8257-49b4-b292-7ceba8420aaf"), "Sovietskiy_rayon", "atk_sovietskiy_rayon", "$2a$11$B.qaHpZvUK.dV9VRvMn4eu8k0cLWponl5G.gX4E9B/mt.ix4NrNb.", 0 },
                    { new Guid("4c9533ad-797d-4605-8f06-91a767900c4e"), "Condinskiy_rayon", "atk_condinskiy_rayon", "$2a$11$HeVy12JhZee23iSUQPexbulhJH2AwdH.FsfIIsVrHzxWiEsZSdzAC", 0 },
                    { new Guid("4ed57e40-af2c-4c02-8748-8d4920addb12"), "Langepas", "atk_langepas", "$2a$11$FKyek8k7vw6ca8K.bHGsvujRJj9d4P97gZ/YB3QiAWOxT3ubmmwoe", 0 },
                    { new Guid("65d0a208-8e07-4012-b441-2b6a6fe6ac6f"), "Yugorsk", "atk_yugorsk", "$2a$11$r6sW/N7FhfSiOf/JxGNRFuW6Pza9.cx27fXaf4M1DGcGdkun62.Vy", 0 },
                    { new Guid("6fb47f93-45b1-4010-9201-105fc0dce893"), "Pyth_yach", "atk_pyth_yach", "$2a$11$ez27EwqCy01leZHps8mRQu6lDVWZPiSLV..43ca2se4HcAN0t4p/W", 0 },
                    { new Guid("74b49b1c-51ae-4758-a5bc-efe195816c35"), "Khanty_mansiysk", "atk_khanty_mansiysk", "$2a$11$iLJbQkdHXRx0chcWLd6RpO3/Hl4NiDAWWIKEccjJXzkSnfzmZwRXi", 0 },
                    { new Guid("9692819c-8ad9-4103-adcf-2437a783fbba"), "Nizhnevartovsk", "atk_nizhnevartovsk", "$2a$11$Wd8wkxxTWWij6/xj536A8uguajA/FNND08usMAP8u0hLBfgkWuiVC", 0 },
                    { new Guid("9dcaa498-6545-4848-bd91-17a58ac9e986"), "Nefteyuganskiy_rayon", "atk_nefteyuganskiy_rayon", "$2a$11$PCbR45FH6ZOqbnfenO7XReyOLblmz3tH48PTzPtwKgUPHKzH7p9CS", 0 },
                    { new Guid("a0d80d08-2ad3-4767-a36b-5d175cfcca13"), "noMunicipality", "atk_khmao", "$2a$11$TiL3mdpo9P/J3QJ0/xRP.eCacsH230pDcLmggbHd0fE9XO4WQDQMy", 0 },
                    { new Guid("b98b1f4f-e7e7-4680-a064-a96a09c22c51"), "Beloyarskiy_rayon", "atk_beloyarskiy_rayon", "$2a$11$0bm67HLZYNSrvi.nXPjH2Of8VMgV1a/NBhXBf4zlxnhK0Iv24OJIC", 0 },
                    { new Guid("bc4bd761-15a6-45ad-af81-e4602b171dad"), "Nizhnevartovskiy_rayon", "atk_nizhnevartovskiy_rayon", "$2a$11$yt21s1PT2m0GSIB7rwoUJ.XdXDrRYoZDf228j6wuMNscIoMdvAvwm", 0 },
                    { new Guid("c9631ada-6fd9-408b-af2c-e760453b7eb4"), "Nefteyugansk", "atk_nefteyugansk", "$2a$11$pMgGY8IcU1K0sDtVAYz37OYjdgq1.BvQTbDsf7sSvM.bLZXDjB6UO", 0 },
                    { new Guid("cceb6761-4ff6-4c89-91d6-2e62e46eab40"), "Raduzhnyi", "atk_raduzhnyi", "$2a$11$Z3u29QyZmAHzZihj9oLB9usdnHrwAH4wWYXSo8r7OCHjnFW9Re9.a", 0 },
                    { new Guid("d6f75ecb-8c12-4b34-aa67-297b5a4ce71b"), "Urai", "atk_urai", "$2a$11$Qlssf8wBZ2dFT5jcrja3su94merfWiVH5Z4KYOmrPsFeWA/P61z6e", 0 },
                    { new Guid("da78d3f6-4df1-47e5-98ae-cd10959d54fb"), "Surgutskiy_rayon", "atk_surgutskiy_rayon", "$2a$11$EbNVcy3st.8HA0jd8/oKA.QZIi9XJ63RfW.nOpQ1nkYz/suja7Clq", 0 },
                    { new Guid("f578684e-662a-45d3-80df-3c5e07b5d2b5"), "Oktyabrskiy_rayon", "atk_oktyabrskiy_rayon", "$2a$11$rj3sESQGKapfzCDzt1VJ..V/Ayu3Fl4EgJuKBUjSYWec50qSBKr7W", 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("04c63480-40f6-4b28-a783-d3e8522222f2"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("19d3ff34-0f45-4929-af4e-1cd1f51b2135"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("1cab65e5-6616-4261-98ba-ce725ca89c60"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("24005700-9409-40ba-9c81-03cce7c15c07"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("3a9be765-2c39-4764-bc22-258e3f4790ee"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("3b180850-74c9-443e-9587-901c253ae74d"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("3f72b19f-d07f-4202-868a-017b45228425"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("463a4829-8257-49b4-b292-7ceba8420aaf"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("4c9533ad-797d-4605-8f06-91a767900c4e"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("4ed57e40-af2c-4c02-8748-8d4920addb12"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("65d0a208-8e07-4012-b441-2b6a6fe6ac6f"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("6fb47f93-45b1-4010-9201-105fc0dce893"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("74b49b1c-51ae-4758-a5bc-efe195816c35"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("9692819c-8ad9-4103-adcf-2437a783fbba"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("9dcaa498-6545-4848-bd91-17a58ac9e986"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("a0d80d08-2ad3-4767-a36b-5d175cfcca13"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("b98b1f4f-e7e7-4680-a064-a96a09c22c51"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("bc4bd761-15a6-45ad-af81-e4602b171dad"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("c9631ada-6fd9-408b-af2c-e760453b7eb4"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("cceb6761-4ff6-4c89-91d6-2e62e46eab40"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("d6f75ecb-8c12-4b34-aa67-297b5a4ce71b"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("da78d3f6-4df1-47e5-98ae-cd10959d54fb"));

            migrationBuilder.DeleteData(
                table: "Organizations",
                keyColumn: "Id",
                keyValue: new Guid("f578684e-662a-45d3-80df-3c5e07b5d2b5"));

            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("0faf9353-06d7-4d83-bb72-36cc77f5f9fc"), "Surgutskiy_rayon", "atk_surgutskiy_rayon", "$2a$11$YOendxtAs9vdta2c05NRC.b/WHmKDVbl6dT16zD.IRmtKHDeX6sqK", 0 },
                    { new Guid("11de291a-6a3b-462b-9b5c-bfd231f9152b"), "Khanty_mansiysk", "atk_urai", "$2a$11$Kr7XF4EezWHdG4rASUuYEuGlA5q7gK1mbShnCYTDAEHJOszPF4gJ2", 0 },
                    { new Guid("15579234-a515-4cb9-8a0c-b7ed5eb8ce41"), "Nizhnevartovskiy_rayon", "atk_nizhnevartovskiy_rayon", "$2a$11$wxsxKLge9/Ikdi9ZQ6VlxOTIUy/gMusKEPialFkgCFf4gLvEkrOE2", 0 },
                    { new Guid("1f507d40-fe24-499c-8df3-c43f610544ca"), "Pyth_yach", "atk_pyth_yach", "$2a$11$.ZKGpvqyRECJFHM7JR7GP.4tdvkflJv4X4l1e5WDhZ/qEP8MFhTh2", 0 },
                    { new Guid("2c63ca17-d56e-418d-9f04-89863b240ecd"), "Sovietskiy_rayon", "atk_sovietskiy_rayon", "$2a$11$tMg/gBhGfaJcLsQHeKw7t.CdsuTIKPck8us1SEZ2daoEpaTKuvRAy", 0 },
                    { new Guid("35ae5afe-4f81-41b7-85ac-d89e1c853f2d"), "Yugorsk", "atk_yugorsk", "$2a$11$.YR8wGTPP.OWQmlHR5HQCefCUVaL9AjOJ6j2ic6qlGfwN1lXT6.WW", 0 },
                    { new Guid("44c63e81-9449-44be-bdf5-02a15e07df82"), "Khanty_mansiysk", "atk_surgut", "$2a$11$r7mx7JR27QNkNrFdIJC4MuXoRu0GFKZnt2S2tRww0vW3TSHx.QrrO", 0 },
                    { new Guid("4dbe5794-f0cb-4ff7-905a-ff1fe08cf3f9"), "Khanty_mansiysk", "atk_khanty_mansiysk", "$2a$11$yBSJO99d7pgOyRJl8ds5AeLFx2IboIr7L3.8Ns7kYbgWE.hbbkbJG", 0 },
                    { new Guid("57b5522d-7777-4826-83cb-5fbad059f31c"), "Condinskiy_rayon", "atk_condinskiy_rayon", "$2a$11$/GHG8ho9d5ohJO0DJE4sKuDiGgFE25fi1gslAY8svNuS2PTrdm1nW", 0 },
                    { new Guid("5d537486-2d4e-479d-ad8c-67731eb381e4"), "Kogalym", "atk_kogalym", "$2a$11$DqMiYWQrPqrZbX.PWepKwOaoT.CkQzZBNsr4qphtblDgylKxRQ7Ne", 0 },
                    { new Guid("61edd380-824b-4667-8268-754f9d438232"), "Khanty_mansiysk", "atk_yugorsk", "$2a$11$Wj9iI5h4HnLQfDL.rWvsUujO56HaElkn56ujgUPykyvZhmMhJfWyS", 0 },
                    { new Guid("691df7fe-525e-4f2d-99a5-635ec2d782fd"), "Raduzhnyi", "atk_raduzhnyi", "$2a$11$p8Y9u3s.s84DVYpWOKyBDu1B31U2obL0RNibS3dr1JkjVdH/Cgidi", 0 },
                    { new Guid("730eda47-9a25-44ab-b78e-4fe3e60de058"), "Beloyarskiy_rayon", "atk_beloyarskiy_rayon", "$2a$11$uJeyxp62bxfrW5Wqeitzz.mh1ahV3A7DE3h.2Ci9fSyi2jrPsj8/G", 0 },
                    { new Guid("80447420-65a9-4355-a811-6a21f0699930"), "Surgut", "atk_surgut", "$2a$11$VfJ2MA8v1FvPSLkQ6y92H./Oyjqc7iGQ7piXjKgx4Or6xPnGWMdpS", 0 },
                    { new Guid("811ed12f-6d7b-4dd6-be5f-3abe06e71c64"), "Urai", "atk_urai", "$2a$11$YOkNng2XS/W5wlUqXu2kL.UMo6Ys/rhu0itAvZlgqjPlTgdkRVEhq", 0 },
                    { new Guid("86d6ea84-6f58-4201-8e9a-5159bab09612"), "Nyagan", "atk_nyagan", "$2a$11$KgOYwpYrlBqRFanvbVSFOeS7s.mWKniiPzU9smzkpKFywQhtl0t56", 0 },
                    { new Guid("8d5ccab9-69b0-46b4-ac1f-1ce95866e2df"), "Nizhnevartovsk", "atk_nizhnevartovsk", "$2a$11$pyR.tbnABcqnWcoc9KdUYOpB.Wuhjtf24yMJPRYUUk/8EkkrxXtnS", 0 },
                    { new Guid("927c6079-3130-46ea-a168-2c4362927ff4"), "Langepas", "atk_langepas", "$2a$11$vYYi2r/eY/cvIxwYNiJbx.bd0ZDQFUrr6iqDkRmJUbsndpDSBxRQe", 0 },
                    { new Guid("98d16169-aec6-4821-b838-85968ba1192e"), "noMunicipality", "atk_khmao", "$2a$11$tTqR4AStpnEHvXhaop3//uIaFVFaR9V4osvIaYgwUmNRhk/Oge.F2", 0 },
                    { new Guid("9a61c105-92fd-4b8b-bd7e-87bdbb811281"), "Pokachi", "atk_pokachi", "$2a$11$RM1XGT1EOM/LK8aBdE6.kOdEn8UGjx.XDrq9WP9lAMcxM108JsaAa", 0 },
                    { new Guid("9cb131f6-e751-430f-bff9-5725e69fb975"), "Khanty_mansiysk", "atk_khanty_mansiysk", "$2a$11$oKoehVAtMkcgBRrXObbmXuJWSbRFK8K3W2rVTzlEVpBzuqxK5pIlq", 0 },
                    { new Guid("a59e3050-ec4a-46f2-a6e3-243dea47cc6b"), "Nefteyugansk", "atk_nefteyugansk", "$2a$11$kZW0crXo2SgGxg46pP4REeN5zM7RqX2rSCVMYX8DVMdFbRJxnwgh2", 0 },
                    { new Guid("a8019561-3cfe-4326-b72b-d27a652fbf20"), "Megion", "atk_megion", "$2a$11$1sdQFdbFtdLGrhg102fOuOx0l.uI1wIhacSKLiBgZ3TEKagWIZuhS", 0 },
                    { new Guid("e97e047b-8bba-4858-8bc7-7d3e1ef879a1"), "Khanty_mansiyskiy_rayon", "atk_khanty_mansiyskiy_rayon", "$2a$11$yMyUDty6APJmaLBtB9KM6uNXG.xjqjpkcll64oQPlf6humIyJiJJi", 0 },
                    { new Guid("f14b0ec2-0580-4a9e-b5f8-b0554e29ec33"), "Oktyabrskiy_rayon", "atk_oktyabrskiy_rayon", "$2a$11$zT0sraa2clkrQCH9.KRcKOWaLovO9DbAvI.KA0yXUaVpWjW8.djdG", 0 },
                    { new Guid("f25aee54-8726-4af7-83e6-06748debd9fb"), "Berezovskiy_rayon", "atk_berezovskiy_rayon", "$2a$11$PCwwGQ4IWyreaEQjL9wK4OO55seLM7efimP0m.VHRMGM9w3FrTNxy", 0 },
                    { new Guid("f8f95e9b-1b07-468e-b72a-701431bd48e6"), "Nefteyuganskiy_rayon", "atk_nefteyuganskiy_rayon", "$2a$11$qhxOgRFtIAJDkHckhtrtZOSiyep/WOMQ57m9Qd0UAoHGsnWB4SlhK", 0 }
                });
        }
    }
}
