using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{
    public class Category(int? schools, int? students, int? workingYouth, int? notWorkingYouth, int? migrants, int? registrated, Guid eventId)
    {
        public Guid Id { get; init; } = Guid.NewGuid();
        public int? Schools { get; set; } = schools;
        public int? Students { get; set; } = students;
        public int? WorkingYouth { get; set; } = workingYouth;
        public int? NotWorkingYouth { get; set; } = notWorkingYouth;
        public int? Migrants { get; set; } = migrants;
        public int? Registrated { get; set; } = registrated;

        [NotMapped]
        public int? Total { get; set; } = schools + students + workingYouth + notWorkingYouth + migrants + registrated;

        public Guid EventId { get; set; } = eventId;

        [Newtonsoft.Json.JsonIgnore]
        public Event? Event { get; set; }
    }
}
