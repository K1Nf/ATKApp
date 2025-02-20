using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{
    public class ReportAndEvent
    {
        public Guid ReportId { get; init; }
        public Guid EventId { get; init; }
        public Event? Event { get; set; }
        public Report? Report { get; set; }
        public DateTime Created_At { get; init; }
    }
}
