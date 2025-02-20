namespace ATKApplication.Models;

public class CategoryAndEvent
{
    public Guid CategoryId { get; set; }
    public Guid EventId { get; set; }
    public Category? Category { get; set; }
    public Event? Event { get; set; }
    public int Count { get; set; }
}
