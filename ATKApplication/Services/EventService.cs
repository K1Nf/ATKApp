using ATKApplication.Contracts.Request;
using ATKApplication.Contracts.Response;
using ATKApplication.DataBase;
using ATKApplication.Enums;
using ATKApplication.Extensions;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.Diagnostics.Tracing.Parsers.Clr;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Linq.Expressions;
using System.Text;
using System.Transactions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ATKApplication.Services
{

    public class EventService(DataBaseContext _dB, ILogger<EventService> _logger)
    {

        public async Task<object?> Get(Guid id)
        {
            var eventForm1 = await _dB.EventForm1s
                .WithBaseIncludes()
                .Include(x => x.Finance)
                .Include(x => x.FeedBack)
                .Include(x => x.InterAgencyCooperations)
                .Include(x => x.Supports)
                .Include(x => x.Audiences)
                .FirstOrDefaultAsync(x => x.Id == id);

            if(eventForm1 != null)
                return eventForm1;


            var eventForm2 = await _dB.EventForm2s
                .WithBaseIncludes()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (eventForm2 != null)
                return eventForm2;


            var eventForm3 = await _dB.EventForm3s
                .WithBaseIncludes()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (eventForm3 != null)
                return eventForm3;


            var eventForm4 = await _dB.EventForm4s
                .WithBaseIncludes()
                .Include(x => x.Agreements)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (eventForm4 != null)
                return eventForm4;


            var eventBase = await _dB.EventsBase
                .WithBaseIncludes()
                .FirstOrDefaultAsync(x => x.Id == id);

            if (eventBase != null)
                return eventBase;

            return null;
        }



        public async Task<Result<List<ShortEventResponse>>> GetAll()
        {
            var events = await _dB.EventsBase
                .WithBaseIncludes()
                .Select(x => new ShortEventResponse
                {
                    Id = x.Id,
                    ThemeCode = x.Theme!.Code,
                    Name = x.Name,
                    ParticipantsCount = x.Categories!.Sum(x => x.Count),
                    Content = x.Content,
                    OrganizerName = x.Organizer!.Name,
                    
                    Date = x.Date == null ? 
                        string.Empty : 
                        $"{x.Date.Value.Day} {GetMonth(x.Date.Value.Month)} {x.Date.Value.Year}",
                    
                    Links = x.MediaLinks
                        .Select(x => x.Content)
                        .ToArray(),

                })
                .ToListAsync();

            return Result.Success(events);
        }



        public async Task<Result<EventBase>> CreateBase(Guid tokenId, CreateEventBaseRequest createEventBaseRequest)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventBaseRequest.Date, createEventBaseRequest.ThemeCode);


            var newEvent = EventBase.Create(createEventBaseRequest.Name, createEventBaseRequest.Actor,
                createEventBaseRequest.Content, eventDate, tokenId, themeId);


            using var transaction = await _dB.Database.BeginTransactionAsync();

            try
            {
                await CreateMediaLinkAsync(createEventBaseRequest.CreateMediaLinkRequest, newEvent.Id);
                await CreateParticipantsAsync(createEventBaseRequest.CreateParticipantsRequest, newEvent.Id);

                await _dB.EventsBase.AddAsync(newEvent);
                await _dB.SaveChangesAsync();
                await transaction.CommitAsync();
            }
            catch (TransactionAbortedException ex)
            {
                await transaction.RollbackAsync();
                _logger.LogError($"Транзакция по созданию мероприятия типа {typeof(EventBase)} провалилась с сообщением: {ex.Message}");
                return Result.Failure<EventBase>("Не удалось создать мероприятие");
            }

            return Result.Success(newEvent);
        }



        public async Task<Result<EventForm1>> CreateEventForm1(Guid tokenId, CreateEventForm1Request createEventForm1Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm1Request.Date, createEventForm1Request.ThemeCode);


            var eventForm1 = new EventForm1(createEventForm1Request.Name, createEventForm1Request.Actor,
                createEventForm1Request.Content, eventDate, tokenId, themeId, createEventForm1Request.EqualToEqual,
                createEventForm1Request.Result, createEventForm1Request.Decision, createEventForm1Request.Form, createEventForm1Request.Level,
                createEventForm1Request.IsValuable, createEventForm1Request.IsBestPractice);


            // begin transaction
            using var transaction = await _dB.Database.BeginTransactionAsync();

            try
            {
                // medialinks, participants, finance, feedback, interagency
                await CreateMediaLinkAsync(createEventForm1Request.CreateMediaLinkRequest, eventForm1.Id);
                await CreateParticipantsAsync(createEventForm1Request.CreateParticipantsRequest, eventForm1.Id);

                await CreateFinanceAsync(createEventForm1Request.CreateFinanceRequest, eventForm1.Id);
                await CreateFeedBackAsync(createEventForm1Request.CreateFeedBackRequest, eventForm1.Id);
                await CreateInterAgencyCoopAsync(createEventForm1Request.CreateInterAgencyCooperationRequest, eventForm1.Id);
                
                await CreateSupportAsync(createEventForm1Request.CreateSupportRequest, eventForm1.Id);
                await CreateAudienceAsync(createEventForm1Request.CreateAudienceRequest, eventForm1.Id);



                await _dB.EventForm1s.AddAsync(eventForm1);

                await _dB.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch (TransactionAbortedException ex)
            {
                await transaction.RollbackAsync();

                _logger.LogError($"ERROR - {DateTime.Now}: Транзакция по созданию мероприятия типа " +
                    $"{typeof(EventForm1)} провалилась с сообщением: {ex.Message}");

                return Result.Failure<EventForm1>("Не удалось создать мероприятие");
            }

            return Result.Success(eventForm1);
        }



        public async Task<Result<EventForm2>> CreateEventForm2(Guid tokenId, CreateEventForm2Request createEventForm2Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm2Request.Date, createEventForm2Request.ThemeCode);

            var eventForm2 = new EventForm2(createEventForm2Request.Actor, createEventForm2Request.Name,
                                          createEventForm2Request.Content, eventDate, tokenId, themeId,
                                          createEventForm2Request.Request, createEventForm2Request.Description,
                                          createEventForm2Request.ResultDescription, createEventForm2Request.Participant);

            using var transaction = await _dB.Database.BeginTransactionAsync();

            try
            {
                await CreateMediaLinkAsync(createEventForm2Request.CreateMediaLinkRequest, eventForm2.Id);
                await CreateParticipantsAsync(createEventForm2Request.CreateParticipantsRequest, eventForm2.Id);

                await _dB.EventForm2s.AddAsync(eventForm2);


                await _dB.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch (TransactionAbortedException ex)
            {
                await transaction.RollbackAsync();

                _logger.LogError($"ERROR - {DateTime.Now}: Транзакция по созданию мероприятия типа " +
                    $"{typeof(EventForm2)} провалилась с сообщением: {ex.Message}");

                return Result.Failure<EventForm2>("Не удалось создать мероприятие");
            }

            return Result.Success(eventForm2);
        }



        public async Task<Result<EventForm3>> CreateEventForm3(Guid tokenId, CreateEventForm3Request createEventForm3Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm3Request.Date, createEventForm3Request.ThemeCode);

            var eventForm3 = new EventForm3(createEventForm3Request.Actor, createEventForm3Request.Name,
                                        createEventForm3Request.Content, eventDate, tokenId,
                                        themeId, createEventForm3Request.Direct,
                                        createEventForm3Request.MaterialsCount, createEventForm3Request.Result);
            

            using var transaction = await _dB.Database.BeginTransactionAsync();
            
            try
            {
                await CreateMediaLinkAsync(createEventForm3Request.CreateMediaLinkRequest, eventForm3.Id);
                await CreateParticipantsAsync(createEventForm3Request.CreateParticipantsRequest, eventForm3.Id);
                await _dB.EventForm3s.AddAsync(eventForm3);


                await _dB.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch (TransactionAbortedException ex)
            {
                await transaction.RollbackAsync();

                _logger.LogError($"ERROR - {DateTime.Now}: Транзакция по созданию мероприятия типа " +
                    $"{typeof(EventForm3)} провалилась с сообщением: {ex.Message}");

                return Result.Failure<EventForm3>("Не удалось создать мероприятие");
            }

            return Result.Success(eventForm3);
        }



        public async Task<Result<EventForm4>> CreateEventForm4(Guid tokenId, CreateEventForm4Request createEventForm4Request)
        {
            var (eventDate, themeId) = GetThemeIdAndDate(createEventForm4Request.Date, createEventForm4Request.ThemeCode);

            var eventForm4 = new EventForm4(createEventForm4Request.Actor, createEventForm4Request.Name,
                                        createEventForm4Request.Content, eventDate, tokenId, themeId,
                                        createEventForm4Request.DirectToNAC,
                                        createEventForm4Request.SendToSubjects);

            using var transaction = await _dB.Database.BeginTransactionAsync();

            try
            {
                await CreateMediaLinkAsync(createEventForm4Request.CreateMediaLinkRequest, eventForm4.Id);
                await CreateParticipantsAsync(createEventForm4Request.CreateParticipantsRequest, eventForm4.Id);
                await CreateAgreementAsync(createEventForm4Request.CreateAgreementRequest, eventForm4.Id);

                await _dB.EventForm4s.AddAsync(eventForm4);


                await _dB.SaveChangesAsync();
                await transaction.CommitAsync();

            }
            catch (TransactionAbortedException ex)
            {
                await transaction.RollbackAsync();

                _logger.LogError($"ERROR - {DateTime.Now}: Транзакция по созданию мероприятия типа " +
                    $"{typeof(EventForm4)} провалилась с сообщением: {ex.Message}");

                return Result.Failure<EventForm4>("Не удалось создать мероприятие");
            }

            return Result.Success(eventForm4);
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
                await transaction.RollbackAsync();
                Console.WriteLine("Ошибка при удалении мероприятия (транзакция прервана): " + ex.Message);
                return Result.Failure("Что-то пошло не так!");
            }
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



        private (DateOnly?, Guid) GetThemeIdAndDate(string? dateRequest, string themeCode)
        {
            var canParseDate = DateOnly.TryParse(dateRequest, out DateOnly eventDate);

            Guid themeId = _dB.Themes
                .AsNoTracking()
                .SingleOrDefault(t => t.Code == themeCode)!
                .Id;

            if (canParseDate)
                return (eventDate, themeId);

            return (null, themeId);
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
                if (createParticipantsRequest.SelectedCategories.Count > 0)                 // Для фиксированных выбранных категорий
                {
                    foreach (SelectedCategory categoryRequest in createParticipantsRequest?.SelectedCategories!)
                    {
                        var resultCategory = EnumHelper.GetEnumValueFromEnumMemberValue<Categories>(categoryRequest.Name);


                        Category? category = Category.Create(categoryRequest.Name, resultCategory ?? Categories.NoCategory,
                            categoryRequest.Count, eventId);
                        
                        if (category != null)
                            await _dB.Categories.AddAsync(category);
                    }
                }
                if (createParticipantsRequest.CustomCategories.Count > 0)              // Для созданных кастомных категорий
                {
                    foreach (CustomCategory customCategory in createParticipantsRequest?.CustomCategories!)
                    {
                        Category? category = Category.Create(customCategory.Label, Categories.Custom,
                            customCategory.Count, eventId);

                        if (category != null)
                            await _dB.Categories.AddAsync(category);
                    }
                }
                else
                {
                    // add just total row info into db
                    Category? category = Category.Create("TOTAL", Categories.NoCategory,
                        createParticipantsRequest.Total, eventId);

                    if (category != null)
                        await _dB.Categories.AddAsync(category);
                }
            }
        }



        private async Task CreateFinanceAsync(CreateFinanceRequest? createFinanceRequest, Guid eventId)
        {
            if (createFinanceRequest is not null)
            {
                var finance = new Finance(createFinanceRequest.MunicipalBudget,
                    createFinanceRequest.RegionalBudget,
                    createFinanceRequest.GranteBudget,
                    createFinanceRequest.OtherBudget,
                    createFinanceRequest.Description,
                    eventId);

                if (finance != null)
                    await _dB.Finances.AddAsync(finance);
            }
        }



        private async Task CreateFeedBackAsync(CreateFeedBackRequest? createFeedBackRequest, Guid eventId)
        {
            if (createFeedBackRequest is not null)
            {
                bool hasInterview = createFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Interview);

                bool hasGuestionnare = createFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Guestionnaire);

                bool hasOnline = createFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Internet);

                bool hasOpros = createFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Opros);

                bool hasOther = createFeedBackRequest
                    .FeedBackTypes.Contains(FeedBackTypes.Other);

                string? description = createFeedBackRequest.Description;

                var feedBack = FeedBack.Create(hasInterview, hasGuestionnare,
                                               hasOnline, hasOpros,
                                               hasOther, description,
                                               eventId);


                if (feedBack != null)
                    await _dB.FeedBacks.AddAsync(feedBack);
            }
        }



        private async Task CreateInterAgencyCoopAsync(CreateInterAgencyCooperationRequest? createInterAgencyCoopRequest, 
            Guid eventId)
        {
            if (createInterAgencyCoopRequest is not null)
            {
                if (createInterAgencyCoopRequest.CustomOrganizations.Count > 0)             // custom организации
                {
                    foreach (var interAgencyCoopRequest in createInterAgencyCoopRequest.CustomOrganizations)
                    {
                        var interAgencyCoop = InterAgencyCooperation.Create(interAgencyCoopRequest.Name, CoOpOrganiations.Custom,
                            interAgencyCoopRequest.Role, interAgencyCoopRequest.Description, eventId);
                        
                        if(interAgencyCoop != null)
                            await _dB.InterAgencyCooperations.AddAsync(interAgencyCoop);
                    }
                }


                if (createInterAgencyCoopRequest.SelectedOrganizations.Count > 0)           // выбранные фиксированные организации
                {
                    foreach (var interAgencyCoopRequest in createInterAgencyCoopRequest.SelectedOrganizations)
                    {
                        var resultAgency = EnumHelper.GetEnumValueFromEnumMemberValue<CoOpOrganiations>(interAgencyCoopRequest.Key);

                        var interAgencyCoop = InterAgencyCooperation.Create(interAgencyCoopRequest.Key ?? null, 
                            resultAgency ?? CoOpOrganiations.Undefined,
                            interAgencyCoopRequest.Value.Role, 
                            interAgencyCoopRequest.Value.Description, 
                            eventId);

                        if (interAgencyCoop != null)
                            await _dB.InterAgencyCooperations.AddAsync(interAgencyCoop);
                    }
                }
            }
        }



        private async Task CreateAgreementAsync(CreateAgreementRequest? createAgreementRequest, Guid eventId)
        {
            if (createAgreementRequest is not null &&
                createAgreementRequest.Agreements.Count > 0)
            {
                foreach (var agreementRequest in createAgreementRequest.Agreements)
                {
                    var agreement = Agreement.Create(agreementRequest.Description, 
                                                    agreementRequest.Name,
                                                    agreementRequest.Result,
                                                    eventId);

                    if (agreement != null)
                        await _dB.Agreements.AddAsync(agreement);
                }
            }
        }



        private async Task CreateAudienceAsync(CreateAudienceRequest? createAudienceRequest, Guid eventId)
        {
            if (createAudienceRequest is not null)
            {
                foreach (var audienceCategory in createAudienceRequest.Audiences)
                {
                    var audience = new Audience(audienceCategory, eventId);

                    if (audience != null)
                        await _dB.Audiences.AddAsync(audience);
                }

            }
        }



        private async Task CreateSupportAsync(CreateSupportRequest? createSupportRequest, Guid eventId)
        {
            if (createSupportRequest is not null)
            {
                var supportsDTOList = createSupportRequest.Supports;

                foreach (var supportDTO in supportsDTOList)
                {
                    var support = new Support(createSupportRequest.Supported, supportDTO.Key, supportDTO.Description, eventId);
                
                    if(support != null)
                        await _dB.Supports.AddAsync(support);
                }
            }
        }



        private static string GetMonth(int month)
        {
            return month switch
            {
                1 => "января",
                2 => "феврая",
                3 => "марта",
                4 => "апреля",
                5 => "мая",
                6 => "июня",
                7 => "июля",
                8 => "августа",
                9 => "сентября",
                10 => "октября",
                11 => "ноября",
                12 => "декабря",
                _ => string.Empty,
            };
        }
    }
}
