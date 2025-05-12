namespace ATKApplication.Models;

public class MediaLink
{
    private MediaLink(string content, Guid eventId)
    {
        Id = Guid.NewGuid();
        Content = content;
        EventId = eventId;
    }

    public MediaLink()
    {
        
    }
    public Guid Id { get; init; }
    public string Content { get; set; }



    [Newtonsoft.Json.JsonIgnore]
    public EventBase? Event { get; set; }
    public Guid EventId { get; set; }

    

    public static MediaLink? Create(string content, Guid eventId)
    {
        if(!content.StartsWith("https://"))
        {
            Console.WriteLine("Неправильная ссылка");
            return null;
            //throw new NullReferenceException("Неправильная ссылка");
        }
        Console.WriteLine("Создали новую ссылку");
        return new (content, eventId);
    }
}
