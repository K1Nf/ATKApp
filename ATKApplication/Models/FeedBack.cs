using ATKApplication.Enums;
using Microsoft.Extensions.Logging;
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

        private FeedBack(bool hasInterview, bool hasGuestionnaire, bool hasInternet, 
                        bool hasOpros, bool hasOther, string? description, Guid eventId)
        {
            Id = Guid.NewGuid();
            HasInterview = hasInterview;
            HasGuestionnaire = hasGuestionnaire;
            HasInternet = hasInternet;
            HasOpros = hasOpros;
            HasOther = hasOther;
            Description = description;
            EventId = eventId;
        }


        public Guid Id { get; init; } 
        public bool HasInterview { get; set; }
        public bool HasGuestionnaire { get; set; }
        public bool HasInternet { get; set; }
        public bool HasOpros { get; set; }
        public bool HasOther { get; set; }
        public string? Description { get; set; }
        
        

        [Newtonsoft.Json.JsonIgnore]
        public EventForm1? Event { get; set; }
        public Guid EventId { get; set; }


        public static FeedBack? Create(bool hasInterview, bool hasGuestionnaire, bool hasInternet,
                        bool hasOpros, bool hasOther, string? description, Guid eventId)
        {
            //validation
            var feedback = new FeedBack(hasInterview, hasGuestionnaire, hasInternet, hasOpros, 
                                        hasOther, description, eventId);
            return feedback;
        }

    }
}
