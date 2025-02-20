namespace ATKApplication.Models
{
    public class Theme
    {
        public Guid Id { get; init; }
        public string Name { get; set; } = null!;
        public List<Event> Events = [];
    }
}
