using ATKApplication.Contracts.Request;
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
    public class PlansController(PlanService _planService) : ControllerBase
    {
        [HttpGet("{userId:guid}")]
        public async Task<IActionResult> GetAll(Guid userId)
        {
            var plans = await _planService.GetAll(userId);
            return Ok(plans.Value);
        }
        

        
        //[HttpGet("{Id:guid}")]
        //public async Task<IActionResult> Get(Guid Id)
        //{
        //    var plan = await _planService.Get(Id);
        //
        //    if (plan.IsSuccess)
        //    {
        //        // создание кастомного под требования ДТО с нужными данными
        //        return Ok(plan.Value);
        //    }
        //
        //    return NotFound("Не найден такой план");
        //}



        [HttpPost("Create")]
        public async Task<IActionResult> Create(/*[FromBody] CreatePlanRequest createPlanRequest*/)
        {
            Guid tokenId = Guid.Parse("");          //NewGuid();
                                                    /*var result = */ 
            await _planService.Create(tokenId);

            //if (result.IsSuccess)
            //{
                return Created();
            //}

            //return BadRequest("План не создан: " + result.Error);
        }



        //[HttpPost("Update/{Id:guid}")]
        //public async Task<IActionResult> Update([FromRoute] Guid Id, [FromBody] UpdatePlanRequest updatePlanRequest)
        //{
        //    Guid tokenId = Guid.NewGuid();
        //    var result = await _planService.Update(Id, tokenId, updatePlanRequest);
        //    
        //    if (result.IsSuccess)
        //    {
        //        return Ok();
        //    }
        //    return BadRequest("План не обновлен: " + result.Error);
        //}


        [HttpPost("Delete/{Id:guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid Id)
        {
            var result = await _planService.Delete(Id);

            if(result.IsSuccess)
            {
                return NoContent();
            }
            
            return BadRequest();
        }
    }
}
