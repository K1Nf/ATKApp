using ATKApplication.Enums;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{

    public class FeedBack(string? description, Guid eventId)
    {
        public Guid Id { get; init; } = Guid.NewGuid();

        public bool HasInterview { get; set; }
        public bool HasGuestionnaire { get; set; }
        public bool HasInternet { get; set; }
        public bool HasOpros { get; set; }
        public bool HasOther { get; set; }
        public Guid EventId { get; set; } = eventId;
        [Newtonsoft.Json.JsonIgnore]
        public Event? Event { get; set; }
        public string? Description { get; set; } = description;

    }
}
