using ATKApplication.Contracts;
using ATKApplication.DataBase;
using ATKApplication.Models;
using ATKApplication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController(EventService _eventService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
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



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateEventRequest createEventRequest)
        {
            Guid tokenId = Guid.NewGuid();
            var result = await _eventService.Create(tokenId, createEventRequest);

            if (result.IsSuccess)
            {
                return Created();
            }
            return BadRequest("Мероприятие не добавлено: " + result.Error);
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
            return BadRequest("Мероприятие не обновлено: " + result.Error);
        }



        [HttpPost("Delete/{Id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _eventService.Delete(id);

            if(result.IsSuccess)
            {
                return NoContent();
            }
            
            return BadRequest();
        }
    }
}
