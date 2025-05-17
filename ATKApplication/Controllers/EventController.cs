using ATKApplication.Contracts.Request;
using ATKApplication.Extensions;
using ATKApplication.Models;
using ATKApplication.Services;
using Microsoft.AspNetCore.Mvc;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class EventsController(EventService _eventService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            Console.WriteLine(Guid.NewGuid());
            var events = await _eventService.GetAll();
            return Ok(events.Value);
        }



        [HttpGet("{Id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var @event = await _eventService.Get(id);

            if (@event.IsSuccess)
            {
                return Ok(@event.Value);
            }

            return NotFound("Не найдено такое мероприятие");
        }



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateEventBaseRequest CreateEventRequest)
        {
            //Console.WriteLine("creating new event...");


            Guid tokenId = Guid.Parse("77e86bc1-1974-44ca-adb1-d96672dcd27d");
            var result = await _eventService.CreateBase(tokenId, CreateEventRequest);

            if (result.IsSuccess)
            {
                return Created();
            }
            return BadRequest("Мероприятие не добавлено:");
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
            var events = await _eventService.GetSortedAndFiltered(filterEntity, page, pageSize);
            return Ok(events);
        }



        [HttpGet("/api/ref/themes")]
        public async Task<IActionResult> GetThemes()
        {
            var themes = await _eventService.GetThemes();
            return Ok(themes);
        }
    }
}