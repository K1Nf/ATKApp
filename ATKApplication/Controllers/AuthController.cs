using ATKApplication.Contracts.Request;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpGet("/login")]
        public async Task GetLoginPage()
        {
            Response.Headers.ContentType = "text/html";
            await Response.SendFileAsync("wwwroot/src/Login/LoginPage.html");
        }


        [HttpPost("authorize")]
        public async Task<IActionResult> Authorize([FromBody] AuthorizeRequest authorizeRequest)
        {
            await Task.Delay(500);
            return Ok("Красавчик! Ты выбрал: '" + authorizeRequest.SelectedOrganization + "'. И ввел пароль: '" + authorizeRequest.Password + "'!!!");    
        }


        [HttpGet("organizations")]
        public async Task<IActionResult> GetOrganizations()
        {
            await Task.Delay(500);

            MunicipalOrganizations[] orgs = (MunicipalOrganizations[])Enum.GetValues(typeof(MunicipalOrganizations));
            return Ok(orgs);
        }
    }
}
