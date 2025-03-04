using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ATKApplication.Controllers
{
    //[Route("api/[controller]")]
    [ApiController]
    public class PagesController : ControllerBase
    {
        [HttpGet("/create")]
        public async Task GetEventsPage()
        {
            Response.Headers.ContentType = "text/html";
            //await Response.WriteAsync("<h2>THIS IS PAGE TO WATCH ALL EVENTS BY ASP.NET CORE 8.0</h2>");
            await Response.SendFileAsync("wwwroot/index.html");
        }


        [HttpGet("/")]
        public async Task GetIndexPage()
        {
            Response.Headers.ContentType = "text/html";
            //await Response.WriteAsync("<h2>THIS IS PAGE TO WATCH ALL EVENTS BY ASP.NET CORE 8.0</h2>");
            await Response.SendFileAsync("wwwroot/src/table/indexTable.html");
        }



        [HttpGet("/events")]
        public async Task GetEventsTablePage()
        {
            Response.Headers.ContentType = "text/html";
            //await Response.WriteAsync("<h2>THIS IS PAGE TO WATCH ALL EVENTS BY ASP.NET CORE 8.0</h2>");
            await Response.SendFileAsync("wwwroot/html/index.html");
        }
    }
}
