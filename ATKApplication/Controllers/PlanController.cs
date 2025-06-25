//using ATKApplication.DataBase;
//using CSharpFunctionalExtensions;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;

//namespace ATKApplication.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class PlansController(DataBaseContext _dB) : ControllerBase
//    {
//        [HttpGet]
//        public async Task<IActionResult> GetAll()
//        {
//            bool a = Guid.TryParse("", out Guid userId);
        
//            var plannedEvents = await _dB.EventsBase
//                //.Where(x => x.IsSystematic == true && x.OrganizerId == userId)
//                .Select(e => new
//                {
//                    e.Actor,
//                    e.Name,
//                    e.Date,
//                    e.Content,
//                    OrganizationName = e.Organizer!.Name
//                })
//                .ToListAsync();

//            return Ok(plannedEvents);
//        }
//    }
//}
