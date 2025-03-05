using ATKApplication.Contracts;
using ATKApplication.DataBase;
using ATKApplication.Models;
using ATKApplication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class EventsController() : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            //await Task.Delay(2000);
            Guid planId = Guid.NewGuid();
            Guid themeId = Guid.NewGuid();

            Organization organization1 = Organization.Create("г. Ханты-Мансийск");

            //await _db.Organizations.AddAsync(organization1);
            //await _db.SaveChangesAsync();

            Plan plan = Plan.Create("План #1", organization1.Id, 2025);

            //await _db.Plans.AddAsync(plan);
            //await _db.SaveChangesAsync();

            Theme theme1 = new()
            {
                Name = "23 февраля"
            };

            Theme theme2 = new()
            {
                Name = "День борьбы с терроризмом"
            };

            //await _db.Themes.AddRangeAsync(theme1, theme2);
            //await _db.SaveChangesAsync();

            Event event1 = Event.Create("Мероприятие 1", "Содержимое и описание мероприятия #1",
                new DateOnly(2025, 03, 03), new TimeOnly(12, 15), organization1.Id, theme1.Id, plan.Id, EventType.Game, Enums.LevelType.Municipal);


            Event event2 = Event.Create("Мероприятие 2", "Содержимое и описание мероприятия #2",
                new DateOnly(2025, 02, 28), new TimeOnly(15, 30), organization1.Id, theme2.Id, plan.Id, EventType.Action, Enums.LevelType.Regional);


            //await _db.Events.AddRangeAsync(event1, event2);
            //await _db.SaveChangesAsync();

            //var events = await _eventService.GetAll();
            List<Event> events = new List<Event> { event1, event2 };
            return Ok(events);
        }
        

        
        [HttpGet("{Id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            //var @event = await _eventService.Get(id);

            //if (@event.IsSuccess)
            //{
            //    // создание кастомного под требования ДТО с нужными данными
            //    return Ok(@event.Value);
            //}

            return NotFound("Не найдено такое мероприятие");
        }



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateEventRequest createEventRequest)
        {
            //Guid tokenId = Guid.NewGuid();
            //var result = await _eventService.Create(tokenId, createEventRequest);

            //if (result.IsSuccess)
            //{
            //    return Created();
            //}
            return BadRequest("Мероприятие не добавлено:");
        }



        [HttpPost("Update/{Id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateEventRequest createEventRequest)
        {
            //Guid tokenId = Guid.NewGuid();
            //var result = await _eventService.Update(id, tokenId, createEventRequest);
            
            //if (result.IsSuccess)
            //{
            //    return Ok();
            //}
            return BadRequest("Мероприятие не обновлено:");
        }



        [HttpPost("Delete/{Id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            //var result = await _eventService.Delete(id);

            //if(result.IsSuccess)
            //{
            //    return NoContent();
            //}
            
            return BadRequest();
        }
    }
}
