using System.Text.Json.Serialization;

namespace ATKApplication.Models
{
    public class Theme
    {
        public Guid Id { get; init; }
        public string Name { get; set; } = null!;
        public string Code { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public List<Event> Events = [];
    }
}
