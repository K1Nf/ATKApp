namespace ATKApplication.Models
{
    public class EventForm4 : EventBase
    {
        public EventForm4() { }

        public EventForm4(Guid id, string actor, string name, string content, DateOnly date, Guid organizerId, Guid themeId,
                          string direct, int materialsCount, string result)
            : base(actor, name, content, date, organizerId, themeId)
        {
            Direct = direct;
            MaterialsCount = materialsCount;
            Result = result;
        }
        public string Direct { get; set; }
        public int MaterialsCount { get; set; }
        public string Result { get; set; }
    }
}
