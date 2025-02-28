using ATKApplication.Enums;
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{
    public class FeedBack(string description, Guid eventId, FeedBackType feedBackType)
    {
        public Guid Id { get; init; }
        public string Description { get; set; } = description;
        public Guid EventId { get; set; } = eventId;
        public Event? Event { get; set; }
        public FeedBackType FeedBackType { get; set; } = feedBackType;

    }
}
