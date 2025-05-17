using ATKApplication.Contracts.Request;
using ATKApplication.Contracts.Response;
using ATKApplication.DataBase;
using ATKApplication.Enums;
using ATKApplication.Extensions;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using System.Text;
using System.Transactions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ATKApplication.Services
{
    
    public class EventService(DataBaseContext _dB)
    {
        private readonly static Guid Event1Id = Guid.NewGuid();
        private readonly static Guid Event2Id = Guid.NewGuid();
        //private readonly static List<EventForm1> EventForms = [
        //    new EventForm1{
        //        Actor = "Исполнитель №1",

        //        Categories = [new Category {
        //            Count = 15,
        //            Name = "Студенты"
        //        },
        //        new Category {
        //            Count = 40,
        //            Name = "Школьники"
        //        }],

        //        Content = "Содержание антитеррористического модуля мероприятия или его краткое описание",
        //        Date = new DateOnly(2025,05,25),
        //        Name = "Название мероприятия",
        //        Decision = "Описание принятых решений по мероприятию",
        //        EqualToEqualDescription = "Какое-то описание формата 'равный равному' №1",
        //        EventType = EventType.Action,
        //        Id = Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"),
        //        //IsSystematic = true,
        //        IsBestPractice = true,
        //        IsValuable = true,
        //        LevelType = LevelType.regional,
        //        Result = "Описание результата мероприятия №1",
        //        InterAgencyCooperations = [new InterAgencyCooperation(Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"), "Организация 1", "Выступление", "Описание выступления")],
        //        FeedBack = new FeedBack{
        //            Id = Guid.NewGuid(),
        //            Description = "Описание результатов сбора обратной связи по мероприятию №1",
        //            HasInternet = true,
        //            HasGuestionnaire = true,
        //            HasInterview = false,
        //            HasOpros = false,
        //            EventId = Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"),
        //            HasOther = false
        //        },
        //        Finance = new Finance(10000, 7500, 25000, 5000, Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"), "Описание дополнительного источника финансирования №1"),
        //        Theme = new Theme{
        //            Code = "1.1.1",
        //            Description = "Проведение мероприятий, посвященных Дню защитника Отечества (23 февраля), Дню солидарности в борьбе с терроризмом (3 сентября), Дню Героев Отечества (9 декабря) с привлечением военнослужащих, сотрудников правоохранительных органов и гражданских лиц, участвовавших в борьбе с терроризмом, экспертов, журналистов, общественных деятелей, очевидцев террористических актов и пострадавших от действий террористов",
        //        },
        //        MediaLinks = [new MediaLink {
        //            Content = "https://link.example.ru",
        //            EventId = Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"),
        //            Id = Guid.NewGuid()
        //        }, new MediaLink {
        //            Content = "https://link2.example.ru",
        //            EventId = Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"),
        //            Id = Guid.NewGuid()
        //        }, new MediaLink {
        //            Content = "https://link3.example.ru",
        //            EventId = Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"),
        //            Id = Guid.NewGuid()
        //        }]
        //    },


        //    new EventForm1{
        //        Actor = "Исполнитель 2 ",

        //        Categories = [new Category {
        //            Count = 25,
        //            Name = "Студенты"
        //        },
        //        new Category {
        //            Count = 30,
        //            Name = "Школьники"
        //        },
        //        new Category {
        //            Count = 10,
        //            Name = "Работающая молодежь"
        //        }],

        //        Content = "Содержание антитеррористического модуля мероприятия или его краткое описание",
        //        Date = new DateOnly(2025,06,22),
        //        Name = "Название мероприятия",
        //        Decision = "Принятые решения по мероприятию",
        //        EqualToEqualDescription = "Какое-то описание формата 'равный равному' №2",
        //        EventType = EventType.Lecture,
        //        Id = Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"),
        //        //IsSystematic = true,
        //        IsBestPractice = false,
        //        IsValuable = true,
        //        LevelType = LevelType.intermunicipality,
        //        Result = "Описание результата мероприятия №2",
        //        InterAgencyCooperations = [new InterAgencyCooperation(Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"), "Организация 1", "Приняли участие", ""),
        //            new InterAgencyCooperation(Guid.Parse("7505d4ff-7dcc-4696-bc10-3d8fad516553"), "Организация 2", "Выступление", "Описание выступления организации 2")
        //        ],
        //        FeedBack = new FeedBack{
        //            Id = Guid.NewGuid(),
        //            Description = "Описание результатов сбора обратной связи",
        //            HasInternet = true,
        //            HasGuestionnaire = false,
        //            HasInterview = true,
        //            HasOpros = false,
        //            EventId = Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"),
        //            HasOther = false
        //        },
        //        Finance = new Finance(15000, 2500, 35000, 4000, Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"), "Описание дополнительного источника финансирования №2"),
        //        Theme = new Theme{
        //            Code = "1.1.2",
        //            Description = "Присвоение улицам, скверам, школам и т.д. имен Героев Российской Федерации, а также иных лиц, отличившихся в борьбе с терроризмом, прежде всего с украинскими националистическими и неонацистскими военизированными формированиями, признанными террористическими организациями"
        //        },
        //        MediaLinks = [new MediaLink {
        //            Content = "https://link.example.ru",
        //            EventId = Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"),
        //            Id = Guid.NewGuid()
        //        }, new MediaLink {
        //            Content = "https://link2.example.ru",
        //             EventId = Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"),
        //            Id = Guid.NewGuid()
        //        }, new MediaLink {
        //            Content = "https://link3.example.ru",
        //             EventId = Guid.Parse("640fe214-155d-432f-8898-5f125359d40e"),
        //            Id = Guid.NewGuid()
        //        }]
        //    },

        //];
        
        public async Task<Result<EventResponse>> Get(Guid id)
        {
            //var @event = await _dB.EventsBase
            //    //.Include(e => e.Finance)
            //    .Include(e => e.Organizer)
            //    .Include(e => e.Theme)
            //    //.Include(e => e.FeedBack)
            //    //.Include(e => e.InterAgencyCooperations)
            //    .Include(e => e.MediaLinks)
            //    .Include(e => e.Categories)
            //    .AsNoTracking()
            //    .FirstOrDefaultAsync(e => e.Id == Id);

            //var @event = await _dB.EventsBase
            //    .Include(x => x.Categories)
            //    .Include(x => x.MediaLinks)
            //    .Include(x => x.Organizer)
            //    .FirstOrDefaultAsync(x => x.Id == id);

            //if (@event == null)
            //{
            //    return Result.Failure<EventResponse>("Мероприятие не найден");
            //}


            //var dateO = @event.Date;


            //var sb = new StringBuilder();
            //foreach (var item in @event.MediaLinks)
            //{
            //    sb.AppendLine(item.Content);
            //}


            //string month = dateO.Month switch
            //{
            //    1 => "январь",
            //    2 => "февраль",
            //    3 => "март",
            //    4 => "апрель",
            //    5 => "май",
            //    6 => "июнь",
            //    7 => "июль",
            //    8 => "август",
            //    9 => "сентябрь",
            //    10 => "октябрь",
            //    11 => "ноябрь",
            //    _ => "декабрь"
            //};
            //var eventRespone = new EventResponse()
            //{
            //    Id = @event.Id,
            //    Content = @event.Content!,
            //    Name = @event.Name!,
            //    DateTime = dateO.Day + " " + month + " " + dateO.Year,

            //    InterAgencyCooperations = @event.InterAgencyCooperations,           // Взаимодействие
            //    FeedBack = @event.FeedBack,                                         // Обратная связь
            //    EqualToEqual = @event.EqualToEqualDescription ?? "Нет",             // Равный равному
            //    Link = sb.ToString().TrimEnd(),                                     // Ссылки
            //    Finance = @event.Finance,                                           // Финансирование
            //    Organizer = @event.Organizer,                                       // Организатор
            //    Theme = @event.Theme,                                               // Тема
            //    //Category = @event.Categories,                                         // Участники

            //    //EventStatus = EventStatus.Planned,
            //    EventType = @event.EventType,
            //    LevelType = @event.LevelType,

            //    IsBestPractice = @event.IsBestPractice ? "Да" : "Нет",
            //    IsSystematic = @event.IsSystematic ? "Да" : "Нет",
            //    IsValuable = @event.IsValuable ? "Да" : "Нет",
            //};

            return new EventResponse();
            //return eventRespone;
        }


        public async Task<Result<List<ShortEventResponse>>> GetAll()
        {
            //var events = await _dB.EventsBase
            //    .Include(e => e.Organizer)
            //    .Include(e => e.Theme)
            //    .Include(e => e.Categories)
            //    .AsNoTracking()
            //    .ToListAsync();



            //List<ShortEventResponse> shortEventsResponse = [.. EventForms.Select(x => new ShortEventResponse
            //{
            //    Id = x.Id,
            //    Name = x.Name!,
            //    //OrganizerName = x.Organizer!.Name,
            //    ThemeCode = x.Theme!.Code,
            //    EventType = x.EventType,
            //    Content = x.Content,
            //    LevelType = x.LevelType,
            //    OrganizerName = "Департамент Х",
            //    Actor = x.Actor,
            //    Date = x.Date,
            //    ParticipantsCount = x.Categories?.Sum(x => x.Count) ?? 0,
            //    Links = [.. x.MediaLinks.Select(x => x.Content)],
            //    IsBestPractice = x.IsBestPractice,
            //    //IsSystematic = x.IsSystematic,
            //    IsValuable = x.IsValuable
            //})];

            return new Result<List<ShortEventResponse>>();
            //return shortEventsResponse;
        }



        public async Task<Result<EventBase>> CreateBase(Guid tokenId, CreateEventBaseRequest createEventBaseRequest)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventBaseRequest.Date, createEventBaseRequest.ThemeCode);


            var newEvent = EventBase.Create(createEventBaseRequest.Name, createEventBaseRequest.Actor,
                createEventBaseRequest.Content, eventDate, tokenId, themeId);


            await CreateMediaLinkAsync(createEventBaseRequest.CreateMediaLinkRequest, newEvent.Id);
            await CreateParticipantsAsync(createEventBaseRequest.CreateParticipantsRequest, newEvent.Id);


            return Result.Failure<EventBase>("Не удалось создать мероприятие");
        }



        public async Task<Result<EventForm1>> CreateEventForm1(Guid tokenId, CreateEventForm1Request createEventForm1Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm1Request.Date, createEventForm1Request.ThemeCode);


            var eventForm1 = new EventForm1(createEventForm1Request.Name, createEventForm1Request.Actor,
                createEventForm1Request.Content, eventDate, tokenId, themeId, createEventForm1Request.Content,
                createEventForm1Request.Result, createEventForm1Request.Decision, createEventForm1Request.Form, createEventForm1Request.Level,
                createEventForm1Request.IsValuable, createEventForm1Request.IsBestPractice);


            // begin transaction

            // medialinks, finance, feedback, participants, interagency

            await CreateMediaLinkAsync(createEventForm1Request.CreateMediaLinkRequest, eventForm1.Id);
            await CreateParticipantsAsync(createEventForm1Request.CreateParticipantsRequest, eventForm1.Id);


            if (createEventForm1Request.CreateFinanceRequest is not null)
            {
                var finance = new Finance(createEventForm1Request.CreateFinanceRequest.MunicipalBudget,
                    createEventForm1Request.CreateFinanceRequest.RegionalBudget,
                    createEventForm1Request.CreateFinanceRequest.GranteBudget,
                    createEventForm1Request.CreateFinanceRequest.OtherBudget,
                    createEventForm1Request.CreateFinanceRequest.Description,
                    eventForm1.Id);

                if (finance != null)
                    await _dB.Finances.AddAsync(finance);
            }


            if (createEventForm1Request.CreateFeedBackRequest is not null)
            {
                bool hasInterview = createEventForm1Request.CreateFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Interview);

                bool hasGuestionnare = createEventForm1Request.CreateFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Guestionnaire);

                bool hasOnline = createEventForm1Request.CreateFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Internet);

                bool hasOpros = createEventForm1Request.CreateFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Opros);
                
                bool hasOther = createEventForm1Request.CreateFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Other);

                string? description = createEventForm1Request.CreateFeedBackRequest.Description;

                var feedBack = FeedBack.Create(hasInterview, hasGuestionnare, 
                                               hasOnline, hasOpros, 
                                               hasOther, description,
                                               eventForm1.Id);


                if (feedBack != null)
                    await _dB.FeedBacks.AddAsync(feedBack);
            }


            if(createEventForm1Request.CreateInterAgencyCooperationRequest is not null &&
                createEventForm1Request.CreateInterAgencyCooperationRequest.Content.Count > 0)
            {
                foreach(var interAgencyCoopRequest in createEventForm1Request.CreateInterAgencyCooperationRequest.Content)
                {
                    var interAgencyCooperation = InterAgencyCooperation.Create(interAgencyCoopRequest.CustomOrganizationName,
                                                        interAgencyCoopRequest.CoOpOrganiations, interAgencyCoopRequest.Type,
                                                        interAgencyCoopRequest.Description, eventForm1.Id);

                    if(interAgencyCooperation != null)
                        await _dB.InterAgencyCooperations.AddAsync(interAgencyCooperation);
                }
            }


            await _dB.EventForm1s.AddAsync(eventForm1);
            await _dB.SaveChangesAsync();

            // commit transaction

            // catch exceptions
            
            return Result.Failure<EventForm1>("Не удалось создать мероприятие");
        }



        public async Task<Result<EventForm2>> CreateEventForm2(Guid tokenId, CreateEventForm2Request createEventForm2Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm2Request.Date, createEventForm2Request.ThemeCode);

            var eventForm2 = new EventForm2(createEventForm2Request.Actor, createEventForm2Request.Name, 
                                          createEventForm2Request.Content, eventDate, tokenId, themeId, 
                                          createEventForm2Request.Request, createEventForm2Request.Description,
                                          createEventForm2Request.ResultDescription, createEventForm2Request.Participant);


            await CreateMediaLinkAsync(createEventForm2Request.CreateMediaLinkRequest, eventForm2.Id);
            await CreateParticipantsAsync(createEventForm2Request.CreateParticipantsRequest, eventForm2.Id);


            await _dB.EventForm2s.AddAsync(eventForm2);
            await _dB.SaveChangesAsync();


            return Result.Failure<EventForm2>("Не удалось создать мероприятие");
        }



        public async Task<Result<EventForm3>> CreateEventForm3(Guid tokenId, CreateEventForm3Request createEventForm3Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm3Request.Date, createEventForm3Request.ThemeCode);

            var eventForm3 = new EventForm3(createEventForm3Request.Actor, createEventForm3Request.Name, 
                                        createEventForm3Request.Content, eventDate, tokenId, 
                                        themeId, createEventForm3Request.Direct, 
                                        createEventForm3Request.MaterialsCount, createEventForm3Request.Result);


            await CreateMediaLinkAsync(createEventForm3Request.CreateMediaLinkRequest, eventForm3.Id);
            await CreateParticipantsAsync(createEventForm3Request.CreateParticipantsRequest, eventForm3.Id);


            await _dB.EventForm3s.AddAsync(eventForm3);
            await _dB.SaveChangesAsync();

            return Result.Failure<EventForm3>("Не удалось создать мероприятие");
        }



        public async Task<Result<EventForm4>> CreateEventForm4(Guid tokenId, CreateEventForm4Request createEventForm4Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm4Request.Date, createEventForm4Request.ThemeCode);

            var eventForm4 = new EventForm4(createEventForm4Request.Actor, createEventForm4Request.Name,
                                        createEventForm4Request.Content, eventDate, tokenId, themeId,
                                        createEventForm4Request.DirectToNAC,
                                        createEventForm4Request.DirectToSubjects,
                                        createEventForm4Request.EqualToEqual);


            await CreateMediaLinkAsync(createEventForm4Request.CreateMediaLinkRequest, eventForm4.Id);
            await CreateParticipantsAsync(createEventForm4Request.CreateParticipantsRequest, eventForm4.Id);


            if (createEventForm4Request.CreateAgreementRequest is not null &&
                createEventForm4Request.CreateAgreementRequest.AgreementRequests.Count > 0)
            {
                foreach (var agreementRequest in createEventForm4Request.CreateAgreementRequest.AgreementRequests)
                {
                    var agreement = Agreement.Create(agreementRequest.Description, agreementRequest.OrganizationEnum, eventForm4.Id);

                    if (agreement != null)
                        await _dB.Agreements.AddAsync(agreement);
                }
            }

            await _dB.EventForm4s.AddAsync(eventForm4);
            await _dB.SaveChangesAsync();

            return Result.Failure<EventForm4>("Не удалось создать мероприятие");
        }



        public async Task<Result> Delete(Guid eventId)
        {
            var transaction = await _dB.Database.BeginTransactionAsync();

            try
            {
                await _dB.EventsBase
                .Where(x => x.Id == eventId)
                .ExecuteDeleteAsync();

                await transaction.CommitAsync();
                return Result.Success();
            }
            catch (TransactionAbortedException ex)
            {
                Console.WriteLine("Ошибка при удалении мероприятия (транзакция прервана): " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }


            await transaction.RollbackAsync();
            return Result.Failure("Что-то пошло не так!");
        }



        public async Task<List<EventBase>> GetSortedAndFiltered(FilterEntity filter, int? page, int? pageSize)
        {
            IQueryable<EventBase> eventsQuery = _dB.EventsBase
                .AsQueryable();

            //if (filter.Level != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.LevelType == filter.Level);
            //}
            //if (filter.Form != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.EventType == filter.Form);
            //}
            //if (filter.Content != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.Content.Contains(filter.Content, StringComparison.CurrentCultureIgnoreCase));
            //}
            //if (filter.IsBestPractice != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.IsBestPractice == filter.IsBestPractice);
            //}
            //if (filter.IsValuable != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.IsValuable == filter.IsValuable);
            //}
            //if (filter.Name != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.Name.Contains(filter.Name, StringComparison.CurrentCultureIgnoreCase));
            //}
            //if (filter.ThemeCode != null)
            //{
//#pragma warning disable CS8602 // Разыменование вероятной пустой ссылки.
            //    eventsQuery = eventsQuery.Where(x => x.Theme.Code.Equals(filter.ThemeCode, StringComparison.CurrentCultureIgnoreCase));
//#pragma warning restore CS8602 // Разыменование вероятной пустой ссылки.
            //}


            // Apply sorting
            if (filter.Orders.Count != 0)
            {
                // sort
                IOrderedQueryable<EventBase>? eventsOrdered = null; //eventsQuery.OrderBy(x => x.Id);
                bool isFirst = true;

                foreach (var order in filter.Orders)
                {
                    if (isFirst)
                        eventsOrdered = null;

                    if (string.Equals(order!.Key, "Date", StringComparison.CurrentCultureIgnoreCase))
                    {
                        Expression<Func<EventBase, dynamic>> expression = ev => ev.Date!;
                        eventsOrdered = ApplyOrdering(eventsQuery, eventsOrdered, expression, order.OrderBy, ref isFirst);
                    }
                    else if (string.Equals(order.Key, "Organizer", StringComparison.CurrentCultureIgnoreCase))
                    {
                        Expression<Func<EventBase, dynamic>> expression = ev => ev.OrganizerId;
                        eventsOrdered = ApplyOrdering(eventsQuery, eventsOrdered, expression, order.OrderBy, ref isFirst);
                    }

                }
                eventsQuery = eventsOrdered!.AsQueryable();
            }



            int entitesCount = pageSize ?? 15;
            int pageNumber = page ?? 1;
            int entitiesToSkip = (pageNumber - 1) * entitesCount;


            var result = await eventsQuery
                .Skip(entitiesToSkip)
                .Take(entitesCount)
                .ToListAsync();


            return result;
        }



        public async Task<List<Theme>> GetThemes() => await _dB.Themes
            .OrderBy(t => t.Code)
            .ToListAsync();
        
        
        
        private static IOrderedQueryable<EventBase> ApplyOrdering(IQueryable<EventBase> query, IOrderedQueryable<EventBase>? orderedQuery, Expression<Func<EventBase, dynamic>> expression, bool orderBy, ref bool isFirst)
        {
            if (isFirst)
            {
                orderedQuery = orderBy ? query.OrderBy(expression) : query.OrderByDescending(expression);
                isFirst = false;
            }
            else
            {
                orderedQuery = orderBy ? orderedQuery!.ThenBy(expression) : orderedQuery!.ThenByDescending(expression);
            }

            return orderedQuery!;
        }



        private (DateOnly, Guid) GetThemeIdAndDate(string dateRequest, string themeCode)
        {
            DateOnly eventDate = DateOnly.Parse(dateRequest);

            Guid themeId = _dB.Themes
                .AsNoTracking()
                .SingleOrDefault(t => t.Code == themeCode)!
                .Id;

            return (eventDate, themeId);
        }



        private async Task CreateMediaLinkAsync(CreateMediaLinkRequest? createMediaLinkRequest, Guid eventId)
        {
            if (createMediaLinkRequest is not null &&
                createMediaLinkRequest.Content.Count > 0)
            {
                foreach (string link in createMediaLinkRequest?.Content!)
                {
                    var mediaLink = MediaLink.Create(link, eventId);

                    if (mediaLink != null)
                        await _dB.MediaLinks.AddAsync(mediaLink);
                }
            }
        }



        private async Task CreateParticipantsAsync(CreateParticipantsRequest? createParticipantsRequest, Guid eventId)
        {
            if (createParticipantsRequest is not null)
            {
                if (createParticipantsRequest.Categories.Count > 0)
                {
                    foreach (CategoryInfoRequest categoryRequest in createParticipantsRequest?.Categories!)
                    {
                        Category? category = Category.Create(categoryRequest.Name, categoryRequest.Category,
                            categoryRequest.Count, eventId);

                        if (category != null)
                            await _dB.Categories.AddAsync(category);
                    }
                }
                else
                {
                    // add just total row info into db
                    Category? category = Category.Create(null, Categories.NoCategory,
                        createParticipantsRequest.Total, eventId);

                    if (category != null)
                        await _dB.Categories.AddAsync(category);
                }
            }
        }
    }
}


