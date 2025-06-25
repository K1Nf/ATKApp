using ATKApplication.Contracts.Request;
using ATKApplication.Infrastructure.Extensions;
using ATKApplication.Domain.Models;
using ATKApplication.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class EventsController(EventService _eventService, IOptions<JWTConfiguration> options) : ControllerBase
    {
        private readonly JWTConfiguration jwtConfiguration = options.Value;


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

            if (@event is not null)
            {
                return Ok(@event);
            }

            return NotFound("Не найдено такое мероприятие с Id: " + id);
        }



        [HttpPost("Createbase")]
        public async Task<IActionResult> Create([FromBody] CreateEventBaseRequest createEventBaseRequest)
        {
            Guid tokenId = Guid.Parse(User.FindFirst(jwtConfiguration.OrganizationId)!.Value);

            var result = await _eventService.CreateBase(tokenId, createEventBaseRequest);

            if (result.IsSuccess)
            {
                return Ok("Created new event with Id: " + result.Value.Id);
            }
            return BadRequest("Мероприятие не добавлено:");
        }



        [HttpPost("Createform1")]
        public async Task<IActionResult> Create1([FromBody] CreateEventForm1Request createEventForm1Request)
        {
            Guid tokenId = Guid.Parse(User.FindFirst(jwtConfiguration.OrganizationId)!.Value);
            var result = await _eventService.CreateEventForm1(tokenId, createEventForm1Request);

            if (result.IsSuccess)
            {
                return Ok("Created new event with Id: " + result.Value.Id);
            }
            return BadRequest("Мероприятие не добавлено:");
        }



        [HttpPost("Createform2")]
        public async Task<IActionResult> Create2([FromBody] CreateEventForm2Request createEventForm2Request)
        {
            Guid tokenId = Guid.Parse(User.FindFirst(jwtConfiguration.OrganizationId)!.Value);
            var result = await _eventService.CreateEventForm2(tokenId, createEventForm2Request);

            if (result.IsSuccess)
            {
                return Ok("Created new event with Id: " + result.Value.Id);
            }
            return BadRequest("Мероприятие не добавлено:");
        }



        [HttpPost("Createform3")]
        public async Task<IActionResult> Create3([FromBody] CreateEventForm3Request createEventForm3Request)
        {
            Guid tokenId = Guid.Parse(User.FindFirst(jwtConfiguration.OrganizationId)!.Value);
            var result = await _eventService.CreateEventForm3(tokenId, createEventForm3Request);

            if (result.IsSuccess)
            {
                return Ok("Created new event with Id: " + result.Value.Id);
            }
            return BadRequest("Мероприятие не добавлено:");
        }



        [HttpPost("Createform4")]
        public async Task<IActionResult> Create4([FromBody] CreateEventForm4Request createEventForm4Request)
        {
            Guid tokenId = Guid.Parse(User.FindFirst(jwtConfiguration.OrganizationId)!.Value);
            var result = await _eventService.CreateEventForm4(tokenId, createEventForm4Request);

            if (result.IsSuccess)
            {
                return Ok("Created new event with Id: " + result.Value.Id);
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
        public async Task<IActionResult> GetSortedAndFiltered([FromQuery] FilterEntity filterEntity, int? page)
        {
            var events = await _eventService.GetSortedAndFiltered(filterEntity, page);
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