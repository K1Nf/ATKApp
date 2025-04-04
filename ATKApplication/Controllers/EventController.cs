using ATKApplication.Contracts.Request;
using ATKApplication.DataBase;
using ATKApplication.Enums;
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
    [EventsFilterNonAsync]
    public class EventsController(/*DataBaseContext _db,*/ EventService _eventService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            /*//await Task.Delay(2000);


            //Organization organization1 = Organization.Create("г. Ханты-Мансийск");

            //await _db.Organizations.AddAsync(organization1);
            //await _db.SaveChangesAsync();
            //Plan plan = Plan.Create("План ⁠1", organization1.Id, 2025);

            //await _db.Plans.AddAsync(plan);
            //await _db.SaveChangesAsync();


            //Theme theme1 = new()
            //{
            //    Name = "23 февраля",
            //    Code = "1.1.2",
            //    Description = "Описание темы # 1.1.2",
            //};

            //Theme theme2 = new()
            //{
            //    Name = "День борьбы с терроризмом",
            //    Code = "1.1.1",
            //    Description = "Описание темы # 1.1.1",
            //};


            //await _db.Themes.AddRangeAsync(theme1, theme2);
            //await _db.SaveChangesAsync();



            //Event event1 = Event.Create("Мероприятие ⁠1", "Содержимое и описание мероприятия ⁠1",
            //    new DateOnly(2025, 06, 03), organization1.Id, theme1.Id, plan.Id, EventType.Game, LevelType.municipality, "описание формата равный равному ⁠1");


            //Event event2 = Event.Create("Мероприятие ⁠2", "Содержимое и описание мероприятия ⁠2",
            //    new DateOnly(2025, 05, 28), organization1.Id, theme2.Id, plan.Id, EventType.Action, LevelType.regional, "описание формата равный равному ⁠2");


            //await _db.Events.AddRangeAsync(event1, event2);
            //await _db.SaveChangesAsync();


            //Category category1 = new Category(15, 20, 10, 25, 12, 4, event1.Id);
            //Category category2 = new Category(15, 20, 10, 25, 5, 30, event2.Id);


            //FeedBack feedBack1 = new FeedBack("Фидбек за мероприятие ⁠1", event1.Id);
            //feedBack1.HasInternet = true;
            //feedBack1.HasInterview = true;
            //feedBack1.HasOpros = false;
            //feedBack1.HasGuestionnaire = false;



            //await _db.Categories.AddAsync(category1);
            //await _db.Categories.AddAsync(category2);
            //await _db.SaveChangesAsync();*/

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



        //[HttpGet("/test")]
        //public async Task<IActionResult> GetTest()
        //{
        //    return Ok(new
        //    {
        //        Id = 123,
        //        Test = EventStatus.Planned
        //    });
        //}



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateEventRequest CreateEventRequest)
        {
            //Console.WriteLine("creating new event...");


            Guid tokenId = Guid.Parse("77e86bc1-1974-44ca-adb1-d96672dcd27d");
            var result = await _eventService.Create(tokenId, CreateEventRequest);

            if (result.IsSuccess)
            {
                return Created();
            }
            return BadRequest("Мероприятие не добавлено:");
        }



        //[HttpPost("Update/{Id:guid}")]
        public async Task<IActionResult> Update(/*[FromRoute] Guid id, [FromBody] UpdateEventRequest createEventRequest*/)
        {
            //Guid tokenId = Guid.NewGuid();
            var result = await _eventService.Update(/*id, tokenId, createEventRequest*/);

            if (result.IsSuccess)
            {
                return Ok();
            }
            return BadRequest("Мероприятие не обновлено:");
        }



        [HttpDelete("Delete/{Id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _eventService.Delete(id);

            if (result.IsSuccess)
            {
                return NoContent();
            }

            return BadRequest("Мероприятие не было удалено из базы(((");
        }



        [HttpGet("sort")]
        public async Task<IActionResult> GetSortedAndFiltered([FromQuery] FilterEntity filterEntity, int? page, int? pageSize)
        {
            //if(filterEntity.Orders.Count == 0)
            //{
            //    return NotFound("COUNT IS 0");
            //}
            var events = await _eventService.GetSortedAndFiltered(filterEntity, page, pageSize);
            return Ok(new { events, eventsCount = events.Count });
        }



        [HttpGet("/api/ref/themes")]
        public async Task<IActionResult> GetThemes()
        {
            //_db
            var themes = await _eventService.GetThemes();
            return Ok(themes);
        }
    }

    public record Sort(string Key, bool OrderBy);

    public class FilterEntity
    {
        public string? Name { get; set; }
        public string? Content { get; set; }
        public string? ThemeCode { get; set; }
        public EventStatus? Status { get; set; }
        public Guid? OrganizerId { get; set; }
        public LevelType? Level { get; set; }
        public EventType? Form { get; set; }
        public bool? IsValuable { get; set; }
        public bool? IsBestPractice { get; set; }
        public List<Sort?> Orders { get; set; } = [];
    }





}
