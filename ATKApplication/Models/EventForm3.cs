namespace ATKApplication.Models
{
    public class EventForm3 : EventBase
    {
        public EventForm3() { }

        public EventForm3(string actor, string name, 
                            string content, DateOnly date, Guid organizerId, 
                            Guid themeId, string direct, 
                            int materialsCount, string result)
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
