using System.Text.Json.Serialization;

namespace ATKApplication.Domain.Models
{
    public class Theme
    {
        public Guid Id { get; init; }
        public string Code { get; set; }
        public int Form { get; set; }
        public string Description { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public List<EventBase> Events { get; set; } = [];
    }
}
