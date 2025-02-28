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
    public class ReportsController(ReportService _reportService) : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var reports = await _reportService.GetAll();
            return Ok(reports.Value);
        }
        

        
        [HttpGet("{Id:guid}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var report = await _reportService.Get(id);

            if (report.IsSuccess)
            {
                // создание кастомного под требования ДТО с нужными данными
                return Ok(report.Value);
            }

            return NotFound("Не найден такой отчет");
        }



        [HttpPost("Create")]
        public async Task<IActionResult> Create([FromBody] CreateReportRequest createReportRequest)
        {
            Guid tokenId = Guid.NewGuid();
            var result = await _reportService.Create(tokenId, createReportRequest);

            if (result.IsSuccess)
            {
                return Created();
            }

            return BadRequest("Отчет не добавлен: " + result.Error);
        }



        [HttpPut("Update/{Id:guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] UpdateReportRequest updateReportRequest)
        {
            Guid tokenId = Guid.NewGuid();
            var result = await _reportService.Update(id, tokenId, updateReportRequest);
            
            if (result.IsSuccess)
            {
                return Ok();
            }
            return BadRequest("Отчет не обновлен: " + result.Error);
        }



        [HttpPut("AddEvents/{Id:guid}")]
        public async Task<IActionResult> AddEvents([FromRoute] Guid Id, [FromQuery] List<Guid> eventsId)
        {
            Guid tokenId = Guid.NewGuid();
            var result = await _reportService.AddEvents(Id, eventsId);

            if (result.IsSuccess)
            {
                return Ok("Все мероприятия успешно добавлены!");
            }

            return BadRequest("Мероприятия не были добавлены в отчет: " + result.Error);
        }



        [HttpPut("DeleteEvents/{Id:guid}")]
        public async Task<IActionResult> DeleteEvents([FromRoute] Guid Id, [FromQuery] List<Guid> eventsId)
        {
            Guid tokenId = Guid.NewGuid();
            var result = await _reportService.DeleteEvents(Id, eventsId);

            if (result.IsSuccess)
            {
                return Ok("Все мероприятия успешно добавлены!");
            }

            return BadRequest("Мероприятия не были добавлены в отчет: " + result.Error);
        }



        [HttpPost("Delete/{Id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var result = await _reportService.Delete(id);

            if(result.IsSuccess)
            {
                return NoContent();
            }
            
            return BadRequest();
        }
    }
}
