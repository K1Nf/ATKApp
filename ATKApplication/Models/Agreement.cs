namespace ATKApplication.Models
{
    public class Agreement
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Organization { get; set; }

        [Newtonsoft.Json.JsonIgnore]
        public EventForm5? Event { get; set; }
    }
}
