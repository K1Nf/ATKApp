﻿using ATKApplication.Contracts.Request;
using ATKApplication.Contracts.Response;
using ATKApplication.Controllers;
using ATKApplication.DataBase;
using ATKApplication.Enums;
using ATKApplication.Models;
using CSharpFunctionalExtensions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Query.SqlExpressions;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Transactions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static System.Runtime.InteropServices.JavaScript.JSType;

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
                .Include(e => e.FeedBack)
                .Include(e => e.InterAgencyCooperations)
                .Include(e => e.MediaLinks)
                .Include(e => e.Category)
                .AsNoTracking()
                .FirstOrDefaultAsync(e => e.Id == Id);

            Console.WriteLine(Guid.NewGuid());
            if (@event == null)
            {
                return Result.Failure<EventResponse>("Мероприятие не найден");
            }


            var dateO = @event.Date;


            var sb = new StringBuilder();
            foreach (var item in @event.MediaLinks)
            {
                sb.AppendLine(item.Content);
            }


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
                DateTime = dateO.Day + " " + month + " " + dateO.Year,

                InterAgencyCooperations = @event.InterAgencyCooperations,           // Взаимодействие
                FeedBack = @event.FeedBack,                                         // Обратная связь
                EqualToEqual = @event.EqualToEqualDescription ?? "Нет",             // Равный равному
                Link = sb.ToString().TrimEnd(),                                     // Ссылки
                Finance = @event.Finance,                                           // Финансирование
                Organizer = @event.Organizer,                                       // Организатор
                Theme = @event.Theme,                                               // Тема
                Category = @event.Category,                                         // Участники

                //EventStatus = EventStatus.Planned,
                EventType = @event.EventType,
                LevelType = @event.LevelType,

                IsBestPractice = @event.IsBestPractice ? "Да" : "Нет",
                IsSystematic = @event.IsSystematic ? "Да" : "Нет",
                IsValuable = @event.IsValuable ? "Да" : "Нет",
            };

            return eventRespone;
        }



        public async Task<Result<List<ShortEventResponse>>> GetAll()
        {
            var events = await _dB.Events
                .Include(e => e.Organizer)
                .Include(e => e.Theme)
                .Include(e => e.Category)
                .AsNoTracking()
                .ToListAsync();

            List<ShortEventResponse> shortEventsResponse = [.. events.Select(x => new ShortEventResponse
            {
                Id = x.Id,
                Date = x.Date,
                //EventStatus =  EventStatus.Planned, //x.Status,
                Form = x.EventType,
                Level = x.LevelType,
                IsBestPractice = x.IsBestPractice ? "Да" : "Нет",
                IsValuable = x.IsValuable ? "Да" : "Нет",
                Name = x.Name,
                OrganizerName = x.Organizer!.Name,
                ThemeCode = x.Theme!.Code,
                ParticipantsCount = x.Category?.Total
            })];

            return shortEventsResponse;
        }



        public async Task<Result<Event>> Create(Guid tokenId, CreateEventRequest createEventRequest)
        {
            DateOnly dateO = DateOnly.Parse(createEventRequest.Date!);
            //int year = dateO.Year;

            Guid themeId = _dB.Themes
                .SingleOrDefault(t => t.Code == createEventRequest.ThemeCode)!
                .Id;

            //Guid planId = _dB.Plans
            //    .AsNoTracking()
            //    .First(e => e.OrganizationId == tokenId && e.Year == year)
            //    .Id;

            var newEvent = Event.Create(createEventRequest.Name, createEventRequest.Content, dateO,
                tokenId, themeId,/* planId,*/ createEventRequest.Form, createEventRequest.Level, createEventRequest.CreateEqualToEqualRequest?.Content);


            var transaction = await _dB.Database.BeginTransactionAsync();
            
            try
            {
                if (createEventRequest.CreateFinanceRequest != null)
                {
                    var financeRequest = createEventRequest.CreateFinanceRequest;
                    var finance = new Finance(financeRequest.MunicipalBudget, financeRequest.RegionalBudget,
                        financeRequest.GranteBudget, financeRequest.OtherBudget, newEvent.Id, financeRequest.Description);

                    await _dB.Finances.AddAsync(finance);
                }


                if (createEventRequest.CreateFeedBackRequest != null)
                {
                    var feedBackRequest = createEventRequest.CreateFeedBackRequest;
                    var feedBack = new FeedBack(feedBackRequest.Description, newEvent.Id);


                    // заменить на рефлексию???
                    if (feedBackRequest.FeedBackTypes.Contains(FeedBackTypes.Opros))
                        feedBack.HasOpros = true;

                    if (feedBackRequest.FeedBackTypes.Contains(FeedBackTypes.Guestionnaire))
                        feedBack.HasGuestionnaire = true;

                    if (feedBackRequest.FeedBackTypes.Contains(FeedBackTypes.Internet))
                        feedBack.HasInternet = true;

                    if (feedBackRequest.FeedBackTypes.Contains(FeedBackTypes.Interview))
                        feedBack.HasInterview = true;


                    await _dB.FeedBacks.AddAsync(feedBack);
                }


                if (createEventRequest.CreateParticipantsRequest != null)
                {
                    var participants = createEventRequest.CreateParticipantsRequest;

                    var category = new Category(participants.SchoolKids, participants.Students, participants.WorkingYouth,
                        participants.NotWorkingYouth, participants.Migrants, participants.RegisteredPersons, newEvent.Id);

                    await _dB.Categories.AddAsync(category);
                }


                if (createEventRequest.CreateMediaLinkRequest?.Content?.Length != 0)
                {
                    var mediaLinkRequest = createEventRequest.CreateMediaLinkRequest;

                    foreach (var item in mediaLinkRequest!.Content)
                    {
                        var mediaLink = MediaLink.Create(item, newEvent.Id);

                        if (mediaLink != null)
                            await _dB.MediaLinks.AddAsync(mediaLink);
                    }
                }


                if (createEventRequest.CreateInterAgencyCooperationRequest?.Content?.Count > 0)
                {
                    var interAgencyCooperationRequest = createEventRequest.CreateInterAgencyCooperationRequest;

                    foreach (var item in interAgencyCooperationRequest.Content)
                    {
                        var interAgencyCooperation = new InterAgencyCooperation(newEvent.Id, item.Name, item.Role, item.Description);

                        if (interAgencyCooperation != null)
                            await _dB.InterAgencyCooperations.AddAsync(interAgencyCooperation);
                    }
                }


                if (newEvent != null)
                {
                    await _dB.Events.AddAsync(newEvent);
                    await _dB.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return Result.Success(newEvent);
                }
            }
            catch (TransactionAbortedException ex)
            {
                Console.WriteLine("Ошибка при создании мероприятия (транзакция прервана): " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Transaction error: " + ex.Message);
            }

            await transaction.RollbackAsync();
            return Result.Failure<Event>("Не удалось создать мероприятие");
        }



#pragma warning disable CS1998 // В асинхронном методе отсутствуют операторы await, будет выполнен синхронный метод
        public async Task<Result> Update(/*Guid eventId, Guid tokenId, UpdateEventRequest updateEventRequest*/)
#pragma warning restore CS1998 // В асинхронном методе отсутствуют операторы await, будет выполнен синхронный метод
        {
            /*//Event
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
                        //.SetProperty(p => p.Time, updateEventRequest.Time)
                        .SetProperty(p => p.Content, updateEventRequest.Content)
                        .SetProperty(p => p.EventType, updateEventRequest.EventType)
                        .SetProperty(p => p.LevelType, updateEventRequest.LevelType)
                        .SetProperty(p => p.Status, updateEventRequest.EventStatus)
                        .SetProperty(p => p.Name, updateEventRequest.Name));

            //var finance = _dB.Finances.FirstOrDefaultAsync(x => x.EventId == eventId);
            //if (finance != null)

            await _dB.SaveChangesAsync();
            await transaction.CommitAsync();*/

            return Result.Success();
            //return Result.Failure<Event>("Не удалось создать мероприятие");
        }



        public async Task<Result> Delete(Guid eventId)
        {
            // transaction???
            return await _dB.Events
                .Where(x => x.Id == eventId)
                .ExecuteDeleteAsync() == 1 ?

                Result.Success() :
                Result.Failure<Event>("Что-то пошло не так!");
        }



        public async Task<List<Event>> GetSortedAndFiltered(FilterEntity filter, int? page, int? pageSize)
        {
            IQueryable<Event> eventsQuery = _dB.Events
                .AsQueryable();

            if (filter.Level != null)
            {
                eventsQuery = eventsQuery.Where(x => x.LevelType == filter.Level);
            }
            if (filter.Form != null)
            {
                eventsQuery = eventsQuery.Where(x => x.EventType == filter.Form);
            }
            if (filter.Content != null)
            {
                eventsQuery = eventsQuery.Where(x => x.Content.Contains(filter.Content, StringComparison.CurrentCultureIgnoreCase));
            }
            //if (filter.Status != null)
            //{
            //    eventsQuery = eventsQuery.Where(x => x.Status == filter.Status);
            //}
            if (filter.IsBestPractice != null)
            {
                eventsQuery = eventsQuery.Where(x => x.IsBestPractice == filter.IsBestPractice);
            }
            if (filter.IsValuable != null)
            {
                eventsQuery = eventsQuery.Where(x => x.IsValuable == filter.IsValuable);
            }
            if (filter.Name != null)
            {
                eventsQuery = eventsQuery.Where(x => x.Name.Contains(filter.Name, StringComparison.CurrentCultureIgnoreCase));
            }
            if (filter.ThemeCode != null)
            {
#pragma warning disable CS8602 // Разыменование вероятной пустой ссылки.
                eventsQuery = eventsQuery.Where(x => x.Theme.Code.Equals(filter.ThemeCode, StringComparison.CurrentCultureIgnoreCase));
#pragma warning restore CS8602 // Разыменование вероятной пустой ссылки.
            }


            // Apply sorting
            if (filter.Orders.Count != 0)
            {
                // sort
                IOrderedQueryable<Event>? eventsOrdered = null; //eventsQuery.OrderBy(x => x.Id);
                bool isFirst = true;

                foreach (var order in filter.Orders)
                {
                    if (isFirst)
                        eventsOrdered = null;

                    if (string.Equals(order!.Key, "Date", StringComparison.CurrentCultureIgnoreCase))
                    {
                        Expression<Func<Event, dynamic>> expression = ev => ev.Date;
                        eventsOrdered = ApplyOrdering(eventsQuery, eventsOrdered, expression, order.OrderBy, ref isFirst);
                    }
                    else if (string.Equals(order.Key, "Organizer", StringComparison.CurrentCultureIgnoreCase))
                    {
                        Expression<Func<Event, dynamic>> expression = ev => ev.OrganizerId;
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

        private static IOrderedQueryable<Event> ApplyOrdering(IQueryable<Event> query, IOrderedQueryable<Event>? orderedQuery, Expression<Func<Event, dynamic>> expression, bool orderBy, ref bool isFirst)
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

        public async Task<List<Theme>> GetThemes() => await _dB.Themes
            .OrderBy(t => t.Code)
            .ToListAsync();
    }
}


