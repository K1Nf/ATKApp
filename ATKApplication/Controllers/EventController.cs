﻿using ATKApplication.Contracts.Request;
using ATKApplication.DataBase;
using ATKApplication.Models;
using ATKApplication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class EventsController(DataBaseContext _db, EventService _eventService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            await Task.Delay(2000);

            /*//Organization organization1 = Organization.Create("г. Ханты-Мансийск");

            //await _db.Organizations.AddAsync(organization1);
            //await _db.SaveChangesAsync();

            //Plan plan = Plan.Create("План #1", organization1.Id, 2025);

            //await _db.Plans.AddAsync(plan);
            //await _db.SaveChangesAsync();

            //Theme theme1 = new()
            //{
            //    Name = "23 февраля"
            //};

            //Theme theme2 = new()
            //{
            //    Name = "День борьбы с терроризмом"
            //};

            //await _db.Themes.AddRangeAsync(theme1, theme2);
            //await _db.SaveChangesAsync();

            //Event event1 = Event.Create("Мероприятие 1", "Содержимое и описание мероприятия #1", 
            //    new DateOnly(2025,03,03), new TimeOnly(12,15), organization1.Id, theme1.Id, plan.Id, EventType.Game, Enums.LevelType.Municipal);


            //Event event2 = Event.Create("Мероприятие 2", "Содержимое и описание мероприятия #2",
            //    new DateOnly(2025, 02, 28), new TimeOnly(15, 30), organization1.Id, theme2.Id, plan.Id, EventType.Action, Enums.LevelType.Regional);


            //await _db.Events.AddRangeAsync(event1, event2);
            //await _db.SaveChangesAsync();*/


            //Category category = new Category(15, 20, 10, 25, 12, 4, Guid.Parse("0195adec-0c7f-7bff-93b5-38632e1b50c2"));
            //await _db.Categories.AddAsync(category);
            //await _db.SaveChangesAsync();
            var events = await _eventService.GetAll();
            return Ok(events.Value);
        }
        

        
        [HttpGet("{Id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var @event = await _eventService.Get(id);

            if (@event.IsSuccess)
            {
                // создание кастомного под требования ДТО с нужными данными
                return Ok(@event.Value);
            }

            return NotFound("Не найдено такое мероприятие");
        }



        [HttpGet("/test")]
        public async Task<IActionResult> GetTest()
        {
            return Ok(new
            {
                Id = 123,
                Test = EventStatus.Planned
            });
        }



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateEventRequest CreateEventRequest)
        {
            //Console.WriteLine("creating new event...");


            Guid tokenId = Guid.Parse("a291d854-cbbb-480f-8309-b14fd32429f5");
            var result = await _eventService.Create(tokenId, CreateEventRequest);
            
            if (result.IsSuccess)
            {
                return Created();
            }
            return BadRequest("Мероприятие не добавлено:");
        }



        [HttpPost("Update/{Id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEventRequest createEventRequest)
        {
            Guid tokenId = Guid.NewGuid();
            var result = await _eventService.Update(id, tokenId, createEventRequest);

            if (result.IsSuccess)
            {
                return Ok();
            }
            return BadRequest("Мероприятие не обновлено:");
        }



        [HttpPost("Delete/{Id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _eventService.Delete(id);

            if (result.IsSuccess)
            {
                return NoContent();
            }

            return BadRequest();
        }
    }
}
