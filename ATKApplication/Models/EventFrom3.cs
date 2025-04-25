namespace ATKApplication.Models
{
    public class EventForm3 : EventBase
    {
        public EventForm3() { }

        public EventForm3(string actor, string name, string content, DateOnly date, Guid organizerId, 
                        Guid themeId, string request, string description, string resultDescription, string participant)
            : base(name, actor, content, date, organizerId, themeId)
        {
            Request = request;
            Description = description;
            ResultDescription = resultDescription;
            Participant = participant;
        }

        public string Request { get; set; }
        public string Description { get; set; }
        public string ResultDescription { get; set; }
        public string Participant { get; set; }
    }
}
