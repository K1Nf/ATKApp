using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class RestructuredEventTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Organizations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Password = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Themes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Code = table.Column<string>(type: "text", nullable: false),
                    Form = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Themes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventsBase",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Actor = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    OrganizerId = table.Column<Guid>(type: "uuid", nullable: false),
                    ThemeId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsBase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventsBase_Organizations_OrganizerId",
                        column: x => x.OrganizerId,
                        principalTable: "Organizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventsBase_Themes_ThemeId",
                        column: x => x.ThemeId,
                        principalTable: "Themes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: true),
                    CategoryEnum = table.Column<int>(type: "integer", nullable: false),
                    Count = table.Column<int>(type: "integer", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Categories_EventsBase_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventsForm2",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Request = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ResultDescription = table.Column<string>(type: "text", nullable: false),
                    Participant = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsForm2", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventsForm2_EventsBase_Id",
                        column: x => x.Id,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventsForm3",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Direct = table.Column<string>(type: "text", nullable: false),
                    MaterialsCount = table.Column<int>(type: "integer", nullable: false),
                    Result = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsForm3", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventsForm3_EventsBase_Id",
                        column: x => x.Id,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventsForm4",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    DirectToNAC = table.Column<bool>(type: "boolean", nullable: false),
                    DirectToSubjects = table.Column<string>(type: "text", nullable: true),
                    EqualToEqual = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsForm4", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventsForm4_EventsBase_Id",
                        column: x => x.Id,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MediaLinks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MediaLinks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MediaLinks_EventsBase_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Supports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Receiver = table.Column<string>(type: "text", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Supports_EventsBase_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Agreements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Organization = table.Column<int>(type: "integer", nullable: false),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agreements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Agreements_EventsForm4_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsForm4",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EventsForm1",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    EventType = table.Column<int>(type: "integer", nullable: false),
                    LevelType = table.Column<int>(type: "integer", nullable: false),
                    IsValuable = table.Column<bool>(type: "boolean", nullable: false),
                    IsBestPractice = table.Column<bool>(type: "boolean", nullable: false),
                    EqualToEqualDescription = table.Column<string>(type: "text", nullable: true),
                    Result = table.Column<string>(type: "text", nullable: true),
                    Decision = table.Column<string>(type: "text", nullable: true),
                    SupportId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsForm1", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventsForm1_EventsBase_Id",
                        column: x => x.Id,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_EventsForm1_Supports_SupportId",
                        column: x => x.SupportId,
                        principalTable: "Supports",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "FeedBacks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    HasInterview = table.Column<bool>(type: "boolean", nullable: false),
                    HasGuestionnaire = table.Column<bool>(type: "boolean", nullable: false),
                    HasInternet = table.Column<bool>(type: "boolean", nullable: false),
                    HasOpros = table.Column<bool>(type: "boolean", nullable: false),
                    HasOther = table.Column<bool>(type: "boolean", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedBacks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_FeedBacks_EventsForm1_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsForm1",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Finances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    MunicipalBudget = table.Column<int>(type: "integer", nullable: true),
                    RegionalBudget = table.Column<int>(type: "integer", nullable: true),
                    GranteBudget = table.Column<int>(type: "integer", nullable: true),
                    OtherBudget = table.Column<int>(type: "integer", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Finances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Finances_EventsForm1_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsForm1",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InterAgencyCooperations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Organization = table.Column<string>(type: "text", nullable: true),
                    CoOpOrganiation = table.Column<int>(type: "integer", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterAgencyCooperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterAgencyCooperations_EventsForm1_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsForm1",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Themes",
                columns: new[] { "Id", "Code", "Description", "Form" },
                values: new object[,]
                {
                    { new Guid("03344859-02a6-4dba-9072-6b2d94a327f4"), "5.1.2", "Описание темы 5.1.2", 0 },
                    { new Guid("0b54267f-b1fb-42f1-af68-7eabe8e9d9ba"), "2.4", "Формирование антитеррористического мировоззрения у детей трудовых мигрантов, привитие им традиционных российских духовно-нравственных ценностей , адаптация в школьных коллективах (далее – мероприятия), а также профилактический охват во внеурочное время", 1 },
                    { new Guid("0da687da-b1e4-46bb-8ebc-f0f0917c67ce"), "1.3.1.2", "Правовое просвещение обучающихся в сфере противодействия идеологии терроризма, в том числе доведение информации об ответственности за совершение преступлений террористической направленности, с привлечением представителей правоохранительных и контрольно-надзорных органов автономного округа (Управление МВД России по автономному округу, преподавателей кафедр (дисциплин) юридического профиля)", 1 },
                    { new Guid("15ecdca5-bc9a-4bac-add6-4839aadb577d"), "1.1.3", "Участие в проекте «Парта героя»", 1 },
                    { new Guid("1e6ed4d2-4a80-4977-b950-4dd4bc4e13be"), "1.1.2", "Присвоение улицам, скверам, школам и т.д. имен Героев Российской Федерации, а также иных лиц, отличившихся в борьбе с терроризмом, прежде всего с украинскими националистическими и неонацистскими военизированными формированиями, признанными террористическими организациями", 1 },
                    { new Guid("2b8030c7-e2c7-4723-98c3-cb1d2d5f52fb"), "3.3.2", "Привлечение деятельно раскаявшихся и отказавшихся от участия в террористической деятельности лиц к проведению профилактической работы, включая создание антитеррористического контента", 0 },
                    { new Guid("310e8b9e-158c-4ab9-99e2-d81b6a4b8545"), "2.1", "Профилактическая работа с лицами, отбывающими наказание в учреждениях УИС, расположенных в автономном округе, в том числе: ознакомление осужденных со средствами наглядной агитации, печатными и аудиовизуальными материалами антитеррористического содержания; проведение с привлечением представителей социально ориентированных некоммерческих и религиозных организаций информационно-просветительских мероприятий для: доведения информации об ответственности за совершение преступлений террористической направленности; продвижения тезиса о бесперспективности совершения террористических актов, к которым подстрекают международные террористические и радикальные организации, украинские спецслужбы, националистические и неонацистские структуры; дискредитации с точки зрения общепринятых норм религии, морали, истории и законов логики террористической идеологии, типичного социального образа террориста, а также террористической деятельности лидеров и участников (сторонников) международных террористических и украинских радикальных организаций", 0 },
                    { new Guid("360f3dbb-d687-4608-84e6-8b0a730481a1"), "5.1.4", "Описание темы 5.1.4", 3 },
                    { new Guid("384c9b07-73c6-4783-94f9-e9b86278ab0d"), "1.4", "Изъятие из библиотечных фондов изданий, содержащих информацию террористического, экстремистского и деструктивного характера, в том числе фальсифицирующую историю России на всех этапах ее становления и развития, дискредитирующую ее политику (далее – издания, содержащие материалы террористической направленности)", 4 },
                    { new Guid("3c8df4e8-85db-4a0a-8bd0-7905e93b76a0"), "1.3.5", "Разработка и внедрение учебных, методических, информационно-разъяснительных и просветительских материалов (в установленной сфере деятельности) (далее – учебно-методические материалы) для использования в образовательном процессе и воспитательной работе с обучающимися образовательных организаций, прибывшими в автономный округ с территорий, ранее находившихся под контролем киевского режима", 5 },
                    { new Guid("450b8587-c2c6-486b-81f9-b44abb7e640d"), "1.5.1", "Проведение общественными организациями, волонтерскими, военно-патриотическими, молодежными и детскими объединениями (в т.ч. Всероссийским детско-юношеским военно-патриотическим общественным движением «Юнармия», общероссийским общественно-государственным движением детей и молодежи «Движение Первых» и др.), а также службами примирения (медиации) по разрешению конфликтных ситуаций) (далее – общественная организация) мероприятий, направленных на формирование антитеррористического мировоззрения у школьников и молодежи", 1 },
                    { new Guid("457bb2de-9721-4ba5-94b7-9106e6ca79f0"), "1.3.1.1", "Проведение мероприятий (тематические лекции, семинары, викторины, кинопоказы, театрализованные постановки, встречи с лидерами общественного мнения и т.п.), направленных на разъяснение преступной сущности ТЕРРОРИСТИЧЕСКИХ, УКРАИНСКИХ НАЦИОНАЛИСТИЧЕСКИХ И НЕОНАЦИСТСКИХ ОРГАНИЗАЦИЙ", 1 },
                    { new Guid("49747362-503d-4984-ae0a-c97fc3ae00d6"), "3.5", "Индивидуальные профилактические мероприятия в отношении подростков и детей, в том числе с признаками травмированной психики, находившихся под влиянием украинских националистических и неонацистских структур, а также проявляющих в социальных сетях и мессенджерах активный интерес к террористическому и деструктивному контенту радикальной, насильственной и суицидальной направленности", 2 },
                    { new Guid("513ac777-e10d-4230-bede-7109b8fc077e"), "3.4.2", "Психолого-педагогическое сопровождение лиц, подверженных деструктивной идеологии, на основе результатов индивидуальных бесед, социально-психологического тестирования, социометрических исследований и иных форм психологической диагностики, педагогического наблюдения за изменениями в поведении обучающихся (в том числе связанных с социально-бытовыми проблемами и трудностями социализации в учебном коллективе, освоении образовательных программ), с привлечением кураторов из числа педагогического состава и студентов-наставников", 2 },
                    { new Guid("55c7071d-518b-4309-8920-323f3ef18c05"), "4.8", "Выявление в информационно-телекоммуникационной сети Интернет материалов, имеющих признаки террористической, экстремистской и иной деструктивной направленности (видео, фото, аудио, текстовых), в том числе путем внедрения современных средств мониторинга, совершенствования форм и алгоритмов передачи сведений о страницах, содержащих противоправный контент, в уполномоченные органы", 4 },
                    { new Guid("61b3e336-5cb2-4a13-a383-d02ce661deb6"), "2.6", "Привлечение жителей новых субъектов Российской Федерации, прибывших в автономный округ, к волонтерской и иной социально полезной деятельности, в том числе антитеррористической направленности, способствующей привитию им традиционных российских духовно-нравственных ценностей", 1 },
                    { new Guid("74837a9a-abc6-48bd-a8d1-1db6a8966a2e"), "1.3.3.1", "Создание тематических площадок, мероприятий, направленных на разъяснение школьникам и молодежи преступной сущности террористической, украинской националистической и неонацистской идеологии при проведении форумов и конференций с привлечением лидеров общественного мнения, общественных деятелей, вернувшихся из зон боевых действий военных корреспондентов, сотрудников правоохранительных органов, военнослужащих и добровольцев", 1 },
                    { new Guid("78e55d9a-c50f-4c61-98e8-1497a83bcd19"), "1.5.2", "Поддержка социально-значимых (культурно-просветительских, гуманитарных, спортивных) проектов, направленных на привитие населению неприятия идеологии терроризма, насилия и негативных социальных явлений", 10 },
                    { new Guid("89f57491-5936-4724-ab60-a8291fd22e09"), "3.1.1", "Проведение мероприятий по формированию антитеррористического мировоззрения среди лиц, осужденных за совершение преступлений террористической направленности", 0 },
                    { new Guid("8b72623f-3cdd-47fc-a8ac-a19d6bc99e08"), "3.2.1", "Оказание социальной поддержки лицам, отбывшим наказание за участие в террористической деятельности", 2 },
                    { new Guid("8ce686fc-c4ad-47be-b6ac-f4510f2b0bd8"), "4.3", "Оказание в условиях государственной (грантовой) поддержки проектов создания материалов, нацеленных на формирование у жителей автономного округа антитеррористического мировоззрения (теле- и радиопередач, игровых и неигровых фильмов, театральных постановок, выставок, буклетов, книжных изданий), распространяемых по наиболее популярным у населения, прежде всего молодежи, информационным каналам (с привлечением региональных и местных средств массовой информации, социально ориентированных некоммерческих организаций, религиозных и общественных организаций, продюсерских центров, творческих объединений и киностудий, администраторов популярных каналов в социальных сетях и мессенджеров (блогеров))", 1 },
                    { new Guid("8de929b2-5513-4073-8dc0-b0f8848448f6"), "1.2.1", "Проведение общественно-политических, воспитательных, просветительских, культурных, досуговых и спортивных мероприятий (круглые столы, акции памяти, встречи с лицами, отличившимися в борьбе с терроризмом и неонацизмом, профилактические беседы, кинопоказы, выставки, тематические викторины, спортивные турниры и др.) (далее – мероприятия), в содержание которых включена антитеррористическая тематика, с привлечением лидеров общественного мнения , общественных деятелей, представителей традиционных религиозных конфессий, общественных и социально ориентированных некоммерческих организаций, детских и молодежных движений (обществ, проектов)", 1 },
                    { new Guid("9185f5a6-ad87-4199-9513-f6963f96b8c9"), "4.5", "Производство и распространение антитеррористических материалов (текстовых, графических, аудио и видео, в том числе в форме социальной рекламы) о нормах законодательства, устанавливающих уголовную ответственность за участие и содействие террористическим организациям, прежде всего за несообщение о преступлении террористической направленности, через региональные и местные средства массовой информации и популярные каналы в социальных сетях и мессенджерах", 5 },
                    { new Guid("925ec770-c7c7-455f-9719-4d571323546d"), "4.1.3", "Создание и обеспечение функционирования электронного каталога антитеррористических материалов (текстовых, графических, аудио и видео) с предоставлением к нему свободного доступа прежде всего для использования при проведении общепрофилактических, адресных, индивидуальных и информационно-пропагандистских мероприятий", 1 },
                    { new Guid("981c9ee0-18c3-4102-b0fc-8a40bffc28f5"), "5.1.3", "Описание темы 5.1.3", 0 },
                    { new Guid("9a810df1-0325-4768-8432-a741dd104770"), "3.6", "Доведение до лиц, получивших религиозное образование за рубежом и имеющих намерения заниматься религиозной деятельностью в автономном округе, положения законодательства Российской Федерации, устанавливающие ответственность за участие и содействие террористической деятельности, несообщение о преступлении, а также содержание традиционных российских духовно-нравственных ценностей", 2 },
                    { new Guid("9b55c699-fd64-4800-aa60-3f3ea4228d97"), "2.3", "Разъяснение иностранным гражданам, прибывшим в Российскую Федерацию для обучения, традиционных российских духовно-нравственных ценностей, норм законодательства Российской Федерации, устанавливающих ответственность за участие и содействие террористической деятельности, разжигание социальной, национальной и религиозной розни, а также о правилах поведения в российском обществе", 1 },
                    { new Guid("9c1abe2d-0532-4ed6-b50b-cf8a579486dc"), "4.4", "Функционирование постоянно действующих выставочных экспозиций, посвященных землякам, которые проявили мужество и героизм, и активную гражданскую позицию в противостоянии с международными террористическими организациями, открытие памятников героям и включение данных памятных мест в экскурсионные программы", 1 },
                    { new Guid("a3e78f68-ff03-4889-8d17-ffae8b7e97e7"), "4.2", "Создание и распространение студенческими медиа-центрами (культурными, радио, театральными студиями, Кибердружинами и др.) антитеррористического контента, в том числе с использованием страниц в социальных сетях и мессенджеров образовательных организаций среднего профессионального образования и высшего образования (с привлечением обучающихся)", 2 },
                    { new Guid("a8b54773-146e-4b82-8bf5-cf4097352777"), "1.1.1", "Проведение мероприятий, посвященных Дню защитника Отечества (23 февраля), Дню солидарности в борьбе с терроризмом (3 сентября), Дню Героев Отечества (9 декабря) с привлечением военнослужащих, сотрудников правоохранительных органов и гражданских лиц, участвовавших в борьбе с терроризмом, экспертов, журналистов, общественных деятелей, очевидцев террористических актов и пострадавших от действий террористов", 1 },
                    { new Guid("ac04cb1f-6ff4-4564-981c-ea404678a93a"), "5.6", "Оказание государственной и муниципальной поддержки некоммерческим, общественным организациям, деятельность которых направлена на привлечение обучающихся и молодежи, состоящей на различных формах учета, к реализации социально значимых, культурно-просветительских, гуманитарных, спортивных проектов, способствующих формированию антитеррористического мировоззрения", 1 },
                    { new Guid("ad134bf8-79cd-4c06-b28b-f3b57aaed257"), "5.3", "Описание темы 5.3", 2 },
                    { new Guid("aeab6d78-670e-4f2c-b18c-e39b7b5bcb7d"), "3.4.1", "Выявление признаков подверженности радикализации обучающихся и студентов, в том числе несовершеннолетних получателей социальных услуг, деструктивным идеологиям, а также склонности к насильственному (агрессивному) и суицидальному поведению. Проведение психодиагностики обучающихся и студентов для определения лиц, склонных к суицидальному поведению, совершению насильственных действий или разделяющих деструктивную идеологию, испытывающих социально-бытовые проблемы и трудности в социализации в учебном коллективе (далее – лица, подверженные деструктивной идеологии), освоении учебных программ» (далее – психодиагностика)", 2 },
                    { new Guid("b015b2f7-416c-4468-beb4-6e2ca541f355"), "2.7.2", "Формирование антитеррористического мировоззрения у членов семей лиц, причастных к террористической деятельности (действующих, осужденных, нейтрализованных), в том числе детей, возвращенных из Сирийской Арабской Республики, Республики Ирак и Пакистана, привлечение их к волонтерской, военно-патриотической и иной социально полезной работе, общественно-политическим, воспитательным, просветительским, культурным, досуговым и спортивным мероприятиям, В ХОДЕ КОТОРОЙ РАЗЪЯСНЯТЬ ПРЕСТУПНУЮ СУЩНОСТЬ ТЕРРОРИСТИЧЕСКИХ И ИНЫХ РАДИКАЛЬНЫХ ОРГАНИЗАЦИЙ И ОТВЕТСТВЕННОСТЬ ЗА УЧАСТИЕ В ИХ ДЕЯТЕЛЬНОСТИ", 2 },
                    { new Guid("b16305d6-50ff-4693-a2cd-3a3298349331"), "3.4.3", "Выявление деструктивных проявлений на страницах в социальных сетях и мессенджерах лицами, подверженными деструктивной идеологии, в том числе с использованием ресурсов Центра информационной безопасности и психологической помощи молодежи автономного округа", 2 },
                    { new Guid("b4dcd98e-30e7-4cd7-a2f0-0b6d06fa0aa5"), "1.3.4", "Организация проведения студентами исследований и реализации творческих (художественных, театральных, журналистских, просветительских) проектов антитеррористического содержания (далее – проект), обеспечение участия их авторов в межвузовских, региональных и всероссийских конкурсах", 1 },
                    { new Guid("b70fe433-7daa-4ab0-bf41-de266462ad73"), "4.1.1", "Размещение в СМИ и сети Интернет: информационных материалов, освещающих организацию и проведение мероприятий, указанных в строках 1.1.1, 1.3.1- 1.3.3.1, 1.5.2 Плана; контента, нацеленного на формирование негативного отношения к терроризму, украинскому национализму и неонацизму, а также неприятие идей массовых убийств, разъяснение социальной значимости профилактической деятельности органов власти и популяризацию лиц, отличившихся в борьбе с терроризмом", 10 },
                    { new Guid("bb5c95d9-b56a-4bc6-aadc-f2c0ea77e47d"), "1.3.2", "Актуализация (конкретизация) учебно-методических материалов (рабочих программ учебных дисциплин, рекомендаций по подготовке и проведению занятий, планов занятий, учебных пособий, курсов лекций, фондов оценочных средств) в целях решения учебно-воспитательных задач по формированию стойкого неприятия идеологии терроризма", 2 },
                    { new Guid("c1cb6f65-d400-4f79-a90d-a0ff44d4240d"), "3.2.2", "Проведение мероприятий информационно-разъяснительного характера с лицами, отбывшими наказание за участие в террористической деятельности", 2 },
                    { new Guid("cd8fa9f4-dfef-467b-938c-3eed22328fec"), "2.7.1", "Интеграция в российское общество членов семей  лиц, причастных к террористической деятельности (действующих, осужденных, нейтрализованных), в том числе детей, возвращенных из Сирийской Арабской Республики, Республики Ирак и Пакистана, оказание им социальной, психологической и правовой помощи", 1 },
                    { new Guid("cf306c08-5335-4552-b934-bf60862f4232"), "1.6", "Анализ психологического климата в образовательных организациях, активности виртуальных деструктивных сообществ, динамики насильственных проявлений среди несовершеннолетних, по результатам которых: принимать меры, направленные на повышение качества организации и реализации воспитательных и профилактических мероприятий в конкретной образовательной организации, в том числе с привлечением учреждений молодежной политики, культуры и спорта; информировать Аппарат АТК автономного округа о принятых мерах", 0 },
                    { new Guid("cf41bd46-bcd4-4bbd-8c10-1aae47640cb7"), "4.7", "Подготовка и распространение тематических материалов, разъясняющих несостоятельность доводов и фактов, оправдывающих террористическую деятельность, совершаемую украинскими националистами, неонацистами и их пособниками", 5 },
                    { new Guid("d64b1e37-8f1c-4e98-bd3e-c1d9eec7374c"), "3.2.3", "Ресоциализация и реинтеграция лиц, отбывших наказание за участие в террористической деятельности, в общество на основе их привлечения к профессиональной, общественной, волонтерской и иной социально-полезной деятельности", 0 },
                    { new Guid("d816173a-2a6b-43ed-a627-3764001a58df"), "2.2", "Разъяснительная работа среди иностранных граждан, прибывших в Российскую Федерацию для осуществления трудовой деятельности, о: нормах законодательства Российской Федерации, устанавливающих ответственность за участие и содействие террористической деятельности, способах сообщения органам власти, уполномоченным рассматривать сообщения о преступлениях, сведений об известных фактах подготовки либо совершения преступлений террористической направленности и лицах, к ним причастных, на площадках консультационных пунктов адаптации мигрантов муниципальных образований автономного округа, автономной некоммерческой организации «Центр социальной и культурной адаптации и интеграции иностранных граждан» (г. Сургут), Дома дружбы народов (гг. Ханты-Мансийск, Сургут)", 1 },
                    { new Guid("d8f3460f-1c3b-486a-89b3-5447185db5c9"), "2.5", "Формирование антитеррористического мировоззрения у школьников и студентов, прибывающих из новых регионов Российской Федерации, их интеграция в учебные коллективы, привлечение к деятельности волонтерских движений, молодежных объединений (в т.ч. «Движение первых», «Юнармия»), студенческих структур (студенческие советы), в том числе культурно-досуговой направленности", 1 },
                    { new Guid("d9cc4fc4-f0a1-47fa-935a-b203977f2592"), "1.3.3.2", "Включение обучающихся и молодежи в организацию и проведение для своих сверстников мероприятий антитеррористической направленности", 10 },
                    { new Guid("e3812226-0777-4acd-91de-17d23e248b1e"), "4.6", "Трансляция выступлений лиц, отказавшихся от участия в террористической деятельности, прежде всего отбывших либо отбывающих наказание за совершение преступлений террористической направленности, в средствах массовой информации, в том числе в информационно-телекоммуникационной сети Интернет", 5 },
                    { new Guid("e5ac0a2a-6071-4525-b39c-63e75fad3924"), "2.8", "Формирование антитеррористического мировоззрения у молодежи, состоящей на различных видах учета, привлечение к волонтерской, военно-патриотической и иной социально-полезной активности, в т.ч. АНТИТЕРРОРИСТИЧЕСКОЙ НАПРАВЛЕННОСТИ, участие в общественно-политических, воспитательных, просветительских, культурных, досуговых и спортивных мероприятиях, в ходе которых разъяснять преступную сущность террористических и иных радикальных организаций и ответственность за участие в их деятельности", 10 },
                    { new Guid("e77ae357-3b47-4375-a049-d4531bb02db3"), "3.1.2", "Привлечение психологов, членов семей, представителей общественных и религиозных организаций к проведению с лицами, осужденными за совершение преступлений террористической направленности, информационно-просветительских и воспитательных мероприятий по разъяснению традиционных российских духовно-нравственных ценностей, общественной опасности терроризма, бесперспективности террористических методов борьбы, правовой и моральной ответственности за участие в деятельности террористических организаций", 0 },
                    { new Guid("ef632006-8eef-4eec-b48b-fc5cc0ede6b4"), "5.2", "Проведение региональных и муниципальных обучающих мероприятий (конференции, форумы, семинары, «круглые столы», и др.) с последующим освещением их результатов на официальных сайтах, в социальных сетях и средствах массовой информации", 1 },
                    { new Guid("fc84290a-44e5-42f9-9c7c-e1aa8d2e8cc1"), "3.3.1", "Проведение с лицами, отбывающими наказание за совершение преступлений террористической направленности, в том числе не связанное с лишением свободы, индивидуальных профилактических мероприятий, нацеленных на разъяснение преступной и античеловеческой сущности терроризма с привлечением психологов, представителей религиозных и общественных организаций", 0 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Agreements_EventId",
                table: "Agreements",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_EventId",
                table: "Categories",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsBase_OrganizerId",
                table: "EventsBase",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsBase_ThemeId",
                table: "EventsBase",
                column: "ThemeId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsForm1_SupportId",
                table: "EventsForm1",
                column: "SupportId");

            migrationBuilder.CreateIndex(
                name: "IX_FeedBacks_EventId",
                table: "FeedBacks",
                column: "EventId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Finances_EventId",
                table: "Finances",
                column: "EventId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_InterAgencyCooperations_EventId",
                table: "InterAgencyCooperations",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_MediaLinks_EventId",
                table: "MediaLinks",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_Supports_EventId",
                table: "Supports",
                column: "EventId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Agreements");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "EventsForm2");

            migrationBuilder.DropTable(
                name: "EventsForm3");

            migrationBuilder.DropTable(
                name: "FeedBacks");

            migrationBuilder.DropTable(
                name: "Finances");

            migrationBuilder.DropTable(
                name: "InterAgencyCooperations");

            migrationBuilder.DropTable(
                name: "MediaLinks");

            migrationBuilder.DropTable(
                name: "EventsForm4");

            migrationBuilder.DropTable(
                name: "EventsForm1");

            migrationBuilder.DropTable(
                name: "Supports");

            migrationBuilder.DropTable(
                name: "EventsBase");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "Themes");
        }
    }
}
