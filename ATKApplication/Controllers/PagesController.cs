using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;

namespace ATKApplication.Controllers
{
    [ApiController]
    [Authorize]
    public class PagesController : ControllerBase
    {
        [HttpGet("/create")]
        public async Task GetCreateEventPage()
        {
            Response.Headers.ContentType = "text/html";
            await Response.SendFileAsync("wwwroot/index.html");
        }


        [HttpGet("/")]
        public async Task GetIndexPage()
        {
            Response.Headers.ContentType = "text/html";
            await Response.SendFileAsync("wwwroot/src/table/indexTable.html");
        }



        [HttpGet("/events")]
        public async Task GetEventsTablePage()
        {
            Response.Headers.ContentType = "text/html";
            await Response.SendFileAsync("wwwroot/src/table/indexTable.html");
        }
        

        [HttpGet("/events/{Id:guid}")]
        public async Task GetEventsPage()
        {
            Response.Headers.ContentType = "text/html";
            await Response.SendFileAsync("wwwroot/src/eventCard/eventCard.html");
        }
    }
}
