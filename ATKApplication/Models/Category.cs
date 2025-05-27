using ATKApplication.Contracts.Request;
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
        public Category() {}

        private Category(string? name, int count, Guid eventId)
        {
            Id = Guid.NewGuid();
            Name  = name;
            Count = count;
            //CategoryEnum = categories;
            EventId = eventId;
        }
        public Guid Id { get; init; }
        public string? Name { get; set; } = null;
        //public Categories CategoryEnum { get; set; } 
        public int? Count { get; set; }



        [Newtonsoft.Json.JsonIgnore]
        public EventBase? Event { get; set; }
        public Guid EventId { get; set; }


        public static Category? Create(string? name, int count, Guid eventId)
        {
            return new Category(name, count, eventId);
        }
    }
}
