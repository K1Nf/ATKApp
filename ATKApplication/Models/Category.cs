using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Models
{
    public class Category
    {
        public Guid Id { get; init; }
        public string Name { get; init; } = null!;
        public List<CategoryAndEvent> Events { get; set; } = [];
    }
}
