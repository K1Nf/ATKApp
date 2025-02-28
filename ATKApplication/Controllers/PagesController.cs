using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ATKApplication.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        [HttpGet("/events")]
        public async Task GetEventsPage()
        {
            Response.Headers.ContentType = "text/html";
            //await Response.WriteAsync("<h2>THIS IS PAGE TO WATCH ALL EVENTS BY ASP.NET CORE 8.0</h2>");
            await Response.SendFileAsync("wwwroot/html/events.html");
        }


        [HttpGet("/")]
        public async Task GetIndexPage()
        {
            Response.Headers.ContentType = "text/html";
            //await Response.WriteAsync("<h2>THIS IS PAGE TO WATCH ALL EVENTS BY ASP.NET CORE 8.0</h2>");
            await Response.SendFileAsync("wwwroot/html/index.html");
        }



        [HttpGet("/eventstable")]
        public async Task GetEventsTablePage()
        {
            Response.Headers.ContentType = "text/html";
            //await Response.WriteAsync("<h2>THIS IS PAGE TO WATCH ALL EVENTS BY ASP.NET CORE 8.0</h2>");
            await Response.SendFileAsync("wwwroot/html/index.html");
        }
    }
}
