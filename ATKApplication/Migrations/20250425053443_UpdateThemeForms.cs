using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Migrations
{
    /// <inheritdoc />
    public partial class UpdateThemeForms : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agreements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Organization = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agreements", x => x.Id);
                });

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
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Count = table.Column<int>(type: "integer", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "EventsBase",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Actor = table.Column<string>(type: "text", nullable: false),
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Content = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: true),
                    OrganizerId = table.Column<Guid>(type: "uuid", nullable: false),
                    ThemeId = table.Column<Guid>(type: "uuid", nullable: false),
                    Discriminator = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    EventType = table.Column<int>(type: "integer", nullable: true),
                    LevelType = table.Column<int>(type: "integer", nullable: true),
                    IsSystematic = table.Column<bool>(type: "boolean", nullable: true),
                    IsValuable = table.Column<bool>(type: "boolean", nullable: true),
                    IsBestPractice = table.Column<bool>(type: "boolean", nullable: true),
                    EqualToEqualDescription = table.Column<string>(type: "text", nullable: true),
                    Result = table.Column<string>(type: "text", nullable: true),
                    Decision = table.Column<string>(type: "text", nullable: true),
                    SupportId = table.Column<Guid>(type: "uuid", nullable: true),
                    Request = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    ResultDescription = table.Column<string>(type: "text", nullable: true),
                    Participant = table.Column<string>(type: "text", nullable: true),
                    Direct = table.Column<string>(type: "text", nullable: true),
                    MaterialsCount = table.Column<int>(type: "integer", nullable: true),
                    EventForm4_Result = table.Column<string>(type: "text", nullable: true),
                    DirectToNAC = table.Column<bool>(type: "boolean", nullable: true),
                    DirectToSubjects = table.Column<bool>(type: "boolean", nullable: true),
                    Directs = table.Column<int>(type: "integer", nullable: true),
                    EqualToEqual = table.Column<string>(type: "text", nullable: true),
                    AgreementId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EventsBase", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EventsBase_Agreements_AgreementId",
                        column: x => x.AgreementId,
                        principalTable: "Agreements",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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
                        name: "FK_FeedBacks_EventsBase_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsBase",
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
                        name: "FK_Finances_EventsBase_EventId",
                        column: x => x.EventId,
                        principalTable: "EventsBase",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InterAgencyCooperations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Organization = table.Column<string>(type: "text", nullable: true),
                    Type = table.Column<string>(type: "text", nullable: true),
                    Description = table.Column<string>(type: "text", nullable: true),
                    EventId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterAgencyCooperations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterAgencyCooperations_EventsBase_EventId",
                        column: x => x.EventId,
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

            migrationBuilder.InsertData(
                table: "Themes",
                columns: new[] { "Id", "Code", "Description", "Form" },
                values: new object[,]
                {
                    { new Guid("06a112ee-756d-47fe-aa34-d8b8127967f0"), "5.6", "Оказание государственной и муниципальной поддержки некоммерческим, общественным организациям, деятельность которых направлена на привлечение обучающихся и молодежи, состоящей на различных формах учета, к реализации социально значимых, культурно-просветительских, гуманитарных, спортивных проектов, способствующих формированию антитеррористического мировоззрения", 1 },
                    { new Guid("11ad681d-2dce-4458-9009-6e0075a63530"), "3.3.1", "Проведение с лицами, отбывающими наказание за совершение преступлений террористической направленности, в том числе не связанное с лишением свободы, индивидуальных профилактических мероприятий, нацеленных на разъяснение преступной и античеловеческой сущности терроризма с привлечением психологов, представителей религиозных и общественных организаций", 0 },
                    { new Guid("399fd99b-c2e4-48c1-8f92-e00865d22bb5"), "2.3", "Разъяснение иностранным гражданам, прибывшим в Российскую Федерацию для обучения, традиционных российских духовно-нравственных ценностей, норм законодательства Российской Федерации, устанавливающих ответственность за участие и содействие террористической деятельности, разжигание социальной, национальной и религиозной розни, а также о правилах поведения в российском обществе", 1 },
                    { new Guid("39a83049-a044-42cf-9b6d-0d64e31055a5"), "3.1.1", "Проведение мероприятий по формированию антитеррористического мировоззрения среди лиц, осужденных за совершение преступлений террористической направленности", 0 },
                    { new Guid("3ea332e1-bc08-4873-b7d9-206457b0d055"), "1.5.2", "Поддержка социально-значимых (культурно-просветительских, гуманитарных, спортивных) проектов, направленных на привитие населению неприятия идеологии терроризма, насилия и негативных социальных явлений", 10 },
                    { new Guid("417dbeaf-e020-42ba-9424-3cb1318f3207"), "3.4.2", "Психолого-педагогическое сопровождение лиц, подверженных деструктивной идеологии, на основе результатов индивидуальных бесед, социально-психологического тестирования, социометрических исследований и иных форм психологической диагностики, педагогического наблюдения за изменениями в поведении обучающихся (в том числе связанных с социально-бытовыми проблемами и трудностями социализации в учебном коллективе, освоении образовательных программ), с привлечением кураторов из числа педагогического состава и студентов-наставников", 2 },
                    { new Guid("41b7139a-3d75-477e-a995-5b86241c7b7d"), "3.2.2", "Проведение мероприятий информационно-разъяснительного характера с лицами, отбывшими наказание за участие в террористической деятельности", 2 },
                    { new Guid("48aca109-7553-43e5-b76e-9359545fcb88"), "3.5", "Индивидуальные профилактические мероприятия в отношении подростков и детей, в том числе с признаками травмированной психики, находившихся под влиянием украинских националистических и неонацистских структур, а также проявляющих в социальных сетях и мессенджерах активный интерес к террористическому и деструктивному контенту радикальной, насильственной и суицидальной направленности", 2 },
                    { new Guid("4c76e0b6-058f-40c3-a776-b65eb30439d5"), "4.4", "Функционирование постоянно действующих выставочных экспозиций, посвященных землякам, которые проявили мужество и героизм, и активную гражданскую позицию в противостоянии с международными террористическими организациями, открытие памятников героям и включение данных памятных мест в экскурсионные программы", 1 },
                    { new Guid("5483f65f-64dd-4e9b-acf2-242f347567ab"), "1.4", "Изъятие из библиотечных фондов изданий, содержащих информацию террористического, экстремистского и деструктивного характера, в том числе фальсифицирующую историю России на всех этапах ее становления и развития, дискредитирующую ее политику (далее – издания, содержащие материалы террористической направленности)", 4 },
                    { new Guid("555f9038-67b9-427f-8f75-924941861576"), "2.2", "Разъяснительная работа среди иностранных граждан, прибывших в Российскую Федерацию для осуществления трудовой деятельности, о: нормах законодательства Российской Федерации, устанавливающих ответственность за участие и содействие террористической деятельности, способах сообщения органам власти, уполномоченным рассматривать сообщения о преступлениях, сведений об известных фактах подготовки либо совершения преступлений террористической направленности и лицах, к ним причастных, на площадках консультационных пунктов адаптации мигрантов муниципальных образований автономного округа, автономной некоммерческой организации «Центр социальной и культурной адаптации и интеграции иностранных граждан» (г. Сургут), Дома дружбы народов (гг. Ханты-Мансийск, Сургут)", 1 },
                    { new Guid("560973b1-5092-49fd-9488-119c34fb6df5"), "3.3.2", "Привлечение деятельно раскаявшихся и отказавшихся от участия в террористической деятельности лиц к проведению профилактической работы, включая создание антитеррористического контента", 0 },
                    { new Guid("566dd330-0065-4a8e-9f0c-44bd4dc42c4a"), "2.6", "Привлечение жителей новых субъектов Российской Федерации, прибывших в автономный округ, к волонтерской и иной социально полезной деятельности, в том числе антитеррористической направленности, способствующей привитию им традиционных российских духовно-нравственных ценностей", 1 },
                    { new Guid("5732648f-ac60-4fef-99de-582d03ec734a"), "1.3.5", "Разработка и внедрение учебных, методических, информационно-разъяснительных и просветительских материалов (в установленной сфере деятельности) (далее – учебно-методические материалы) для использования в образовательном процессе и воспитательной работе с обучающимися образовательных организаций, прибывшими в автономный округ с территорий, ранее находившихся под контролем киевского режима", 5 },
                    { new Guid("5ceff139-0093-45d3-a7a5-7b79545cec96"), "1.2.1", "Проведение общественно-политических, воспитательных, просветительских, культурных, досуговых и спортивных мероприятий (круглые столы, акции памяти, встречи с лицами, отличившимися в борьбе с терроризмом и неонацизмом, профилактические беседы, кинопоказы, выставки, тематические викторины, спортивные турниры и др.) (далее – мероприятия), в содержание которых включена антитеррористическая тематика, с привлечением лидеров общественного мнения , общественных деятелей, представителей традиционных религиозных конфессий, общественных и социально ориентированных некоммерческих организаций, детских и молодежных движений (обществ, проектов)", 1 },
                    { new Guid("5d16367b-164e-419e-b03d-c012420e7ef2"), "1.3.2", "Актуализация (конкретизация) учебно-методических материалов (рабочих программ учебных дисциплин, рекомендаций по подготовке и проведению занятий, планов занятий, учебных пособий, курсов лекций, фондов оценочных средств) в целях решения учебно-воспитательных задач по формированию стойкого неприятия идеологии терроризма", 2 },
                    { new Guid("69951d6e-6c50-4c01-bd17-d0a22826a8d6"), "1.1.3", "Участие в проекте «Парта героя»", 1 },
                    { new Guid("6ee8119b-735c-4b3d-8c06-72621d1ab443"), "2.4", "Формирование антитеррористического мировоззрения у детей трудовых мигрантов, привитие им традиционных российских духовно-нравственных ценностей , адаптация в школьных коллективах (далее – мероприятия), а также профилактический охват во внеурочное время", 1 },
                    { new Guid("731e6eb4-4fe2-4e4f-8562-114ca99d63a2"), "3.4.3", "Выявление деструктивных проявлений на страницах в социальных сетях и мессенджерах лицами, подверженными деструктивной идеологии, в том числе с использованием ресурсов Центра информационной безопасности и психологической помощи молодежи автономного округа", 2 },
                    { new Guid("749d7e06-e2ce-48a0-b064-d7b35428af25"), "4.5", "Производство и распространение антитеррористических материалов (текстовых, графических, аудио и видео, в том числе в форме социальной рекламы) о нормах законодательства, устанавливающих уголовную ответственность за участие и содействие террористическим организациям, прежде всего за несообщение о преступлении террористической направленности, через региональные и местные средства массовой информации и популярные каналы в социальных сетях и мессенджерах", 5 },
                    { new Guid("76655043-2a70-4b85-af4d-5e7999a6dd5b"), "1.3.4", "Организация проведения студентами исследований и реализации творческих (художественных, театральных, журналистских, просветительских) проектов антитеррористического содержания (далее – проект), обеспечение участия их авторов в межвузовских, региональных и всероссийских конкурсах", 1 },
                    { new Guid("78731c4a-d9bb-45b2-9fd2-ff34d0ec660c"), "1.1.1", "Проведение мероприятий, посвященных Дню защитника Отечества (23 февраля), Дню солидарности в борьбе с терроризмом (3 сентября), Дню Героев Отечества (9 декабря) с привлечением военнослужащих, сотрудников правоохранительных органов и гражданских лиц, участвовавших в борьбе с терроризмом, экспертов, журналистов, общественных деятелей, очевидцев террористических актов и пострадавших от действий террористов", 1 },
                    { new Guid("791d0529-f596-4e6c-9581-46f53900f094"), "2.8", "Формирование антитеррористического мировоззрения у молодежи, состоящей на различных видах учета, привлечение к волонтерской, военно-патриотической и иной социально-полезной активности, в т.ч. АНТИТЕРРОРИСТИЧЕСКОЙ НАПРАВЛЕННОСТИ, участие в общественно-политических, воспитательных, просветительских, культурных, досуговых и спортивных мероприятиях, в ходе которых разъяснять преступную сущность террористических и иных радикальных организаций и ответственность за участие в их деятельности", 10 },
                    { new Guid("7c41b14d-9a30-41c4-b368-0d0096208b38"), "5.1.4", "Описание темы 5.1.4", 3 },
                    { new Guid("7c7d9fc2-5c08-4c73-8736-2c9cb59d63e4"), "4.8", "Выявление в информационно-телекоммуникационной сети Интернет материалов, имеющих признаки террористической, экстремистской и иной деструктивной направленности (видео, фото, аудио, текстовых), в том числе путем внедрения современных средств мониторинга, совершенствования форм и алгоритмов передачи сведений о страницах, содержащих противоправный контент, в уполномоченные органы", 4 },
                    { new Guid("84a28a4f-a342-4663-a092-57f2044183b8"), "5.2", "Проведение региональных и муниципальных обучающих мероприятий (конференции, форумы, семинары, «круглые столы», и др.) с последующим освещением их результатов на официальных сайтах, в социальных сетях и средствах массовой информации", 1 },
                    { new Guid("89135231-73ba-4de0-853c-89226ae2ae9b"), "3.4.1", "Выявление признаков подверженности радикализации обучающихся и студентов, в том числе несовершеннолетних получателей социальных услуг, деструктивным идеологиям, а также склонности к насильственному (агрессивному) и суицидальному поведению. Проведение психодиагностики обучающихся и студентов для определения лиц, склонных к суицидальному поведению, совершению насильственных действий или разделяющих деструктивную идеологию, испытывающих социально-бытовые проблемы и трудности в социализации в учебном коллективе (далее – лица, подверженные деструктивной идеологии), освоении учебных программ» (далее – психодиагностика)", 2 },
                    { new Guid("8bfcc30c-d1da-4504-a5bc-43169b08bae0"), "3.6", "Доведение до лиц, получивших религиозное образование за рубежом и имеющих намерения заниматься религиозной деятельностью в автономном округе, положения законодательства Российской Федерации, устанавливающие ответственность за участие и содействие террористической деятельности, несообщение о преступлении, а также содержание традиционных российских духовно-нравственных ценностей", 2 },
                    { new Guid("8f949051-f438-4178-9124-975dd56bd33c"), "3.2.3", "Ресоциализация и реинтеграция лиц, отбывших наказание за участие в террористической деятельности, в общество на основе их привлечения к профессиональной, общественной, волонтерской и иной социально-полезной деятельности", 0 },
                    { new Guid("944b4182-94db-49bc-8bbe-b04670af1508"), "4.7", "Подготовка и распространение тематических материалов, разъясняющих несостоятельность доводов и фактов, оправдывающих террористическую деятельность, совершаемую украинскими националистами, неонацистами и их пособниками", 5 },
                    { new Guid("97fbd078-2e9f-46c1-9bed-a1bd5fc51eaf"), "4.1.3", "Создание и обеспечение функционирования электронного каталога антитеррористических материалов (текстовых, графических, аудио и видео) с предоставлением к нему свободного доступа прежде всего для использования при проведении общепрофилактических, адресных, индивидуальных и информационно-пропагандистских мероприятий", 1 },
                    { new Guid("99eb5e31-9188-4bfc-a2a3-5fea666c9449"), "3.2.1", "Оказание социальной поддержки лицам, отбывшим наказание за участие в террористической деятельности", 2 },
                    { new Guid("a7043a4d-0288-443a-a8f6-db38ed6181f4"), "2.1", "Профилактическая работа с лицами, отбывающими наказание в учреждениях УИС, расположенных в автономном округе, в том числе: ознакомление осужденных со средствами наглядной агитации, печатными и аудиовизуальными материалами антитеррористического содержания; проведение с привлечением представителей социально ориентированных некоммерческих и религиозных организаций информационно-просветительских мероприятий для: доведения информации об ответственности за совершение преступлений террористической направленности; продвижения тезиса о бесперспективности совершения террористических актов, к которым подстрекают международные террористические и радикальные организации, украинские спецслужбы, националистические и неонацистские структуры; дискредитации с точки зрения общепринятых норм религии, морали, истории и законов логики террористической идеологии, типичного социального образа террориста, а также террористической деятельности лидеров и участников (сторонников) международных террористических и украинских радикальных организаций", 0 },
                    { new Guid("a77a328f-53ac-4b6c-b3dd-1965c133c1eb"), "2.7.2", "Формирование антитеррористического мировоззрения у членов семей лиц, причастных к террористической деятельности (действующих, осужденных, нейтрализованных), в том числе детей, возвращенных из Сирийской Арабской Республики, Республики Ирак и Пакистана, привлечение их к волонтерской, военно-патриотической и иной социально полезной работе, общественно-политическим, воспитательным, просветительским, культурным, досуговым и спортивным мероприятиям, В ХОДЕ КОТОРОЙ РАЗЪЯСНЯТЬ ПРЕСТУПНУЮ СУЩНОСТЬ ТЕРРОРИСТИЧЕСКИХ И ИНЫХ РАДИКАЛЬНЫХ ОРГАНИЗАЦИЙ И ОТВЕТСТВЕННОСТЬ ЗА УЧАСТИЕ В ИХ ДЕЯТЕЛЬНОСТИ", 2 },
                    { new Guid("a8aa0be2-f818-491a-a47b-9102c5314dc0"), "3.1.2", "Привлечение психологов, членов семей, представителей общественных и религиозных организаций к проведению с лицами, осужденными за совершение преступлений террористической направленности, информационно-просветительских и воспитательных мероприятий по разъяснению традиционных российских духовно-нравственных ценностей, общественной опасности терроризма, бесперспективности террористических методов борьбы, правовой и моральной ответственности за участие в деятельности террористических организаций", 0 },
                    { new Guid("a9e54430-9932-433f-ae70-8ad5a96ef8f2"), "1.5.1", "Проведение общественными организациями, волонтерскими, военно-патриотическими, молодежными и детскими объединениями (в т.ч. Всероссийским детско-юношеским военно-патриотическим общественным движением «Юнармия», общероссийским общественно-государственным движением детей и молодежи «Движение Первых» и др.), а также службами примирения (медиации) по разрешению конфликтных ситуаций) (далее – общественная организация) мероприятий, направленных на формирование антитеррористического мировоззрения у школьников и молодежи", 1 },
                    { new Guid("ab48f16e-5c95-4aa6-ae2f-a755e24d7569"), "1.3.3.2", "Включение обучающихся и молодежи в организацию и проведение для своих сверстников мероприятий антитеррористической направленности", 10 },
                    { new Guid("b11061f5-0577-4e89-a5e1-dc5d952703af"), "2.5", "Формирование антитеррористического мировоззрения у школьников и студентов, прибывающих из новых регионов Российской Федерации, их интеграция в учебные коллективы, привлечение к деятельности волонтерских движений, молодежных объединений (в т.ч. «Движение первых», «Юнармия»), студенческих структур (студенческие советы), в том числе культурно-досуговой направленности", 1 },
                    { new Guid("b19540b9-c955-4048-898f-7852142509b7"), "4.2", "Создание и распространение студенческими медиа-центрами (культурными, радио, театральными студиями, Кибердружинами и др.) антитеррористического контента, в том числе с использованием страниц в социальных сетях и мессенджеров образовательных организаций среднего профессионального образования и высшего образования (с привлечением обучающихся)", 2 },
                    { new Guid("b31ab8ae-27ac-4cb3-ab97-159fe198f2d1"), "1.1.2", "Присвоение улицам, скверам, школам и т.д. имен Героев Российской Федерации, а также иных лиц, отличившихся в борьбе с терроризмом, прежде всего с украинскими националистическими и неонацистскими военизированными формированиями, признанными террористическими организациями", 1 },
                    { new Guid("bb46548c-04d1-45cb-ab1d-8ae2ce4d7cfd"), "1.6", "Анализ психологического климата в образовательных организациях, активности виртуальных деструктивных сообществ, динамики насильственных проявлений среди несовершеннолетних, по результатам которых: принимать меры, направленные на повышение качества организации и реализации воспитательных и профилактических мероприятий в конкретной образовательной организации, в том числе с привлечением учреждений молодежной политики, культуры и спорта; информировать Аппарат АТК автономного округа о принятых мерах", 0 },
                    { new Guid("c2a8c91d-0cd3-4dba-8ab3-462fa3619505"), "2.7.1", "Интеграция в российское общество членов семей  лиц, причастных к террористической деятельности (действующих, осужденных, нейтрализованных), в том числе детей, возвращенных из Сирийской Арабской Республики, Республики Ирак и Пакистана, оказание им социальной, психологической и правовой помощи", 1 },
                    { new Guid("c31aa872-2b3c-4d25-ba18-c0206551f3c7"), "5.1.3", "Описание темы 5.1.3", 0 },
                    { new Guid("c73a2d23-b9eb-4441-8971-544d6d16231e"), "4.1.1", "Размещение в СМИ и сети Интернет: информационных материалов, освещающих организацию и проведение мероприятий, указанных в строках 1.1.1, 1.3.1- 1.3.3.1, 1.5.2 Плана; контента, нацеленного на формирование негативного отношения к терроризму, украинскому национализму и неонацизму, а также неприятие идей массовых убийств, разъяснение социальной значимости профилактической деятельности органов власти и популяризацию лиц, отличившихся в борьбе с терроризмом", 10 },
                    { new Guid("d6c14078-15de-4cad-976f-ca53e7d6f799"), "1.3.3.1", "Создание тематических площадок, мероприятий, направленных на разъяснение школьникам и молодежи преступной сущности террористической, украинской националистической и неонацистской идеологии при проведении форумов и конференций с привлечением лидеров общественного мнения, общественных деятелей, вернувшихся из зон боевых действий военных корреспондентов, сотрудников правоохранительных органов, военнослужащих и добровольцев", 1 },
                    { new Guid("da0cef7e-f6aa-488d-9670-c54919182487"), "1.3.1.1", "Проведение мероприятий (тематические лекции, семинары, викторины, кинопоказы, театрализованные постановки, встречи с лидерами общественного мнения и т.п.), направленных на разъяснение преступной сущности ТЕРРОРИСТИЧЕСКИХ, УКРАИНСКИХ НАЦИОНАЛИСТИЧЕСКИХ И НЕОНАЦИСТСКИХ ОРГАНИЗАЦИЙ", 1 },
                    { new Guid("dd97f4c3-c886-4447-9f99-6aabbec27451"), "1.3.1.2", "Правовое просвещение обучающихся в сфере противодействия идеологии терроризма, в том числе доведение информации об ответственности за совершение преступлений террористической направленности, с привлечением представителей правоохранительных и контрольно-надзорных органов автономного округа (Управление МВД России по автономному округу, преподавателей кафедр (дисциплин) юридического профиля)", 1 },
                    { new Guid("e2e5320e-dafe-4bac-929d-da1ea70d454e"), "5.1.2", "Описание темы 5.1.2", 0 },
                    { new Guid("f3725ba8-a244-441a-9d8b-12d2f63c8afa"), "4.3", "Оказание в условиях государственной (грантовой) поддержки проектов создания материалов, нацеленных на формирование у жителей автономного округа антитеррористического мировоззрения (теле- и радиопередач, игровых и неигровых фильмов, театральных постановок, выставок, буклетов, книжных изданий), распространяемых по наиболее популярным у населения, прежде всего молодежи, информационным каналам (с привлечением региональных и местных средств массовой информации, социально ориентированных некоммерческих организаций, религиозных и общественных организаций, продюсерских центров, творческих объединений и киностудий, администраторов популярных каналов в социальных сетях и мессенджеров (блогеров))", 1 },
                    { new Guid("fa2886e0-d6ff-419b-92e0-014660cbee25"), "4.6", "Трансляция выступлений лиц, отказавшихся от участия в террористической деятельности, прежде всего отбывших либо отбывающих наказание за совершение преступлений террористической направленности, в средствах массовой информации, в том числе в информационно-телекоммуникационной сети Интернет", 5 },
                    { new Guid("fb30cabe-9c40-4242-8859-efaa1697cd50"), "5.3", "Описание темы 5.3", 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Categories_EventId",
                table: "Categories",
                column: "EventId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsBase_AgreementId",
                table: "EventsBase",
                column: "AgreementId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EventsBase_OrganizerId",
                table: "EventsBase",
                column: "OrganizerId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsBase_SupportId",
                table: "EventsBase",
                column: "SupportId");

            migrationBuilder.CreateIndex(
                name: "IX_EventsBase_ThemeId",
                table: "EventsBase",
                column: "ThemeId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_EventsBase_EventId",
                table: "Categories",
                column: "EventId",
                principalTable: "EventsBase",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_EventsBase_Supports_SupportId",
                table: "EventsBase",
                column: "SupportId",
                principalTable: "Supports",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Supports_EventsBase_EventId",
                table: "Supports");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "FeedBacks");

            migrationBuilder.DropTable(
                name: "Finances");

            migrationBuilder.DropTable(
                name: "InterAgencyCooperations");

            migrationBuilder.DropTable(
                name: "MediaLinks");

            migrationBuilder.DropTable(
                name: "EventsBase");

            migrationBuilder.DropTable(
                name: "Agreements");

            migrationBuilder.DropTable(
                name: "Organizations");

            migrationBuilder.DropTable(
                name: "Supports");

            migrationBuilder.DropTable(
                name: "Themes");
        }
    }
}
