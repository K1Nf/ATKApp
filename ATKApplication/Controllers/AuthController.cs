using ATKApplication.Contracts.Request;
using ATKApplication.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class AuthController(AuthService _authService) : ControllerBase
    {
        [HttpGet("/login")]
        public async Task GetLoginPage()
        {
            Response.Headers.ContentType = "text/html";
            await Response.SendFileAsync("wwwroot/src/Login/LoginPage.html");
        }



        [HttpPost("authorize")]
        public IActionResult Authorize([FromBody] AuthorizeRequest authorizeRequest)
        {
            var result = _authService.Authorize(authorizeRequest);

            if (result.IsFailure)
            {
                return NotFound(result.Error);

            }
            return Ok("Красавчик! Ты выбрал: '" + authorizeRequest.OrganizationName + "' и прошел авторизацию!");    
        }



        [HttpGet("organizations")]
        public async Task<IActionResult> GetOrganizations()
        {
            await Task.Delay(500);

            AllMunicipalityOrganizations[] orgs = (AllMunicipalityOrganizations[])Enum.GetValues(typeof(AllMunicipalityOrganizations));
            return Ok(orgs);
        }
    }
}
