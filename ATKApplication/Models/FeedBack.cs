using ATKApplication.Enums;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{

    public class FeedBack//(string? description, Guid eventId)
    {
        public FeedBack()
        {
            
        }
        public Guid Id { get; init; } = Guid.NewGuid();

        public bool HasInterview { get; set; }
        public bool HasGuestionnaire { get; set; }
        public bool HasInternet { get; set; }
        public bool HasOpros { get; set; }
        public bool HasOther { get; set; }
        public string? Description { get; set; }// = description;
        
        

        [Newtonsoft.Json.JsonIgnore]
        public EventForm2? Event { get; set; }
        public Guid EventId { get; set; } //= eventId;

    }
}
