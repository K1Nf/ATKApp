using ATKApplication.DataBase;
using ATKApplication.Enums;
using ATKApplication.Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ATKApplication.Controllers
{
    [Route("api/ref/[controller]")]
    [ApiController]
    public class OrganizationsController(DataBaseContext _dB) : ControllerBase
    {
        [HttpGet()]
        public async Task<IActionResult> GetOrgnanizations()
        {
            return Ok(await _dB.Organizations.ToListAsync());
        }



        [HttpGet("municipalities")]
        public async Task<IActionResult> GetMunicipalities()
        {
            Municipalities[] municipalities = (Municipalities[])Enum.GetValues(typeof(Municipalities));
            return Ok(municipalities);
        }



        [HttpGet("departments")]
        public async Task<IActionResult> GetDepartaments([FromQuery] string municipality)
        {
            //string[] departments = [municipality + "123", municipality + "321", municipality + "222"];

            Municipalities? municipalityEnum = EnumHelper.GetEnumValueFromEnumMember<Municipalities>(municipality);

            var departments = await _dB.Organizations
                .Where(x => x.Municipality == municipalityEnum)
                .Select(m => m.Name)
                .ToListAsync();

            return Ok(departments);
        }
    }
}
