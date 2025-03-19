using ATKApplication.Contracts.Request;
using ATKApplication.Contracts.Response;
using ATKApplication.DataBase;
using ATKApplication.Enums;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Services
{
    public class EventService(DataBaseContext _dB)
    {
        public async Task<Result<EventResponse>> Get(Guid Id)
        {
            var @event = await _dB.Events
                .Include(e => e.Finance)
                .Include(e => e.Organizer)
                .Include(e => e.Theme)
                .Include(e => e.Category)
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == Id);

            Console.WriteLine(Guid.NewGuid());
            if (@event == null)
            {
                return Result.Failure<EventResponse>("Мероприятие не найден");
            }

            var dateO = @event.Date;
            var timeO = @event.Time;

            string month = dateO.Month switch
            {
                1 => "январь",
                2 => "февраль",
                3 => "март",
                4 => "апрель",
                5 => "май",
                6 => "июнь",
                7 => "июль",
                8 => "август",
                9 => "сентябрь",
                10 => "октябрь",
                11 => "ноябрь",
                _ => "декабрь"
            };
            var eventRespone = new EventResponse()
            {
                Id = @event.Id,
                Content = @event.Content,
                Name = @event.Name,

                DateTime = dateO.Day + " " + month + " " + dateO.Year + " " + timeO.Hour + ":" + timeO.Minute,

                EventStatus = @event.Status,
                EventType = @event.EventType,
                LevelType = @event.LevelType,
                IsBestPractice = @event.IsBestPractice ? "Да" : "Нет",
                IsEffective = @event.IsEffective ? "Да" : "Нет",
                IsValuable = @event.IsValuable ? "Да" : "Нет",
                Finance = @event.Finance,
                Organizer = @event.Organizer,
                Theme = @event.Theme,
                Category = @event.Category,
            };

            return eventRespone;
        }



        public async Task<Result<List<Event>>> GetAll()
        {
            var events = await _dB.Events
                .Include(e => e.Organizer)
                .Include(e => e.Theme)
                .AsNoTracking()
                .ToListAsync();

            return events;
        }



        public async Task<Result<Event>> Create(Guid tokenId, CreateEventRequest createEventRequest)
        {
            //Guid planId = _dB.Plans.
            //    First(e => e.OrganizationId == tokenId && e.Year == createEventRequest.Date.Year)
            //    .Id;

            //var newEvent = Event.Create(createEventRequest.Name, createEventRequest.Content, createEventRequest.Date,
            //    createEventRequest.Time, tokenId, createEventRequest.ThemeId,
            //    planId, createEventRequest.EventType, createEventRequest.LevelType);


            //transaction begin

            //if (newEvent != null)
            //{
            //    if (createEventRequest.CreateFinanceRequest != null)
            //    {
            //        var financeRequest = createEventRequest.CreateFinanceRequest;

            //        var finance = new Finance(financeRequest.MunicipalBudget, financeRequest.RegionalBudget,
            //            financeRequest.GranteBudget, financeRequest.OtherBudget, newEvent.Id);

            //        await _dB.Finances.AddAsync(finance);
            //        await _dB.SaveChangesAsync(); //???
            //        //_dB.Attach(finance); //???
            //    }

            //    if (createEventRequest.CreateFeedBackRequest != null)
            //    {
            //        var feedBackRequest = createEventRequest.CreateFeedBackRequest;

            //        var feedBack = new FeedBack(feedBackRequest.Description, newEvent.Id, FeedBackType.Internet /*feedBackRequest.FeedBackTypes*/);

            //        await _dB.FeedBacks.AddAsync(feedBack);
            //        await _dB.SaveChangesAsync(); //???
            //        //_dB.Attach(feedBack); //???
            //    }

            //    if (createEventRequest.CreateMediaLinkRequest != null)
            //    {
            //        var mediaLinkRequest = createEventRequest.CreateMediaLinkRequest;

            //        var mediaLink = MediaLink.Create(mediaLinkRequest.Content, newEvent.Id);

            //        if(mediaLink != null)
            //        {
            //            await _dB.MediaLinks.AddAsync(mediaLink);
            //            await _dB.SaveChangesAsync(); //???
            //        //_dB.Attach(mediaLink); //???
            //        }
            //    }

            //    if (createEventRequest.CreateInterAgencyCooperationRequest != null)
            //    {
            //        var interAgencyCooperationRequest = createEventRequest.CreateInterAgencyCooperationRequest;

            //        //var interAgencyCooperation = new InterAgencyCooperation(newEvent.Id, 
            //        //    interAgencyCooperationRequest.OrganizerId, interAgencyCooperationRequest.Content);
            //        //
            //        //
            //        //await _dB.InterAgencyCooperations.AddAsync(interAgencyCooperation);
            //        //await _dB.SaveChangesAsync(); //???
            //        //_dB.Attach(interAgencyCooperation); //???
            //    }

            //    if (newEvent != null)
            //    {
            //        await _dB.Events.AddAsync(newEvent);
            //        await _dB.SaveChangesAsync();
            //        return Result.Success(newEvent);
            //    }
            //}

            return Result.Failure<Event>("Не удалось создать мероприятие");
        }


        public async Task<Result> Update(Guid eventId, Guid tokenId, UpdateEventRequest updateEventRequest)
        {
            //Event
            //var @event = await _dB.Events
            //    .FirstOrDefaultAsync(x => x.Id == eventId);
            //
            //if (@event == null)
            //{
            //    return Result.Failure("Не найдено");
            //}
            //
            //@event.Status = updateEventRequest.EventStatus;


            using var transaction = await _dB.Database.BeginTransactionAsync();

            await _dB.Events
                .Where(x => x.Id == eventId && x.OrganizerId == tokenId)
                    .ExecuteUpdateAsync(x => x.
                        SetProperty(p => p.Date, updateEventRequest.Date)
                        .SetProperty(p => p.Time, updateEventRequest.Time)
                        .SetProperty(p => p.Content, updateEventRequest.Content)
                        .SetProperty(p => p.EventType, updateEventRequest.EventType)
                        .SetProperty(p => p.LevelType, updateEventRequest.LevelType)
                        .SetProperty(p => p.Status, updateEventRequest.EventStatus)
                        .SetProperty(p => p.Name, updateEventRequest.Name));

            //var finance = _dB.Finances.FirstOrDefaultAsync(x => x.EventId == eventId);
            //if (finance != null)

            await _dB.SaveChangesAsync();
            await transaction.CommitAsync();

            return Result.Success();
            //return Result.Failure<Event>("Не удалось создать мероприятие");
        }


        public async Task<Result> Delete(Guid eventId)
        {
            // transaction???
            int deletedEventsCount = await _dB.Events
                .Where(x => x.Id == eventId)
                .ExecuteDeleteAsync();
            
            if (deletedEventsCount == 1)
            {
                return Result.Success();
            }

            return Result.Failure<Event>("Что-то пошло не так!");
        }
    }
}
