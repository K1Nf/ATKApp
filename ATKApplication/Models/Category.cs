using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{
    public class Category
    {
        public Category(int count, string name, Guid eventId)
        {
            Id = Guid.NewGuid();
            Name  = name;
            Count = count;
            EventId = eventId;
        }
        public Category()
        {
            
        }
        public Guid Id { get; init; }
        public string Name { get; set; } 
        public int? Count { get; set; }



        [Newtonsoft.Json.JsonIgnore]
        public EventBase? Event { get; set; }
        public Guid EventId { get; set; }
    }
}
