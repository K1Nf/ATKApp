namespace ATKApplication.Domain.Models;

public class MediaLink
{
    private MediaLink(string content, string? orgName, Guid eventId)
    {
        Id = Guid.NewGuid();
        Content = content;
        OrganizationName = orgName;
        EventId = eventId;
    }

    public MediaLink()
    {
        
    }
    public Guid Id { get; init; }
    public string Content { get; set; }
    public string? OrganizationName { get; set; }



    [Newtonsoft.Json.JsonIgnore]
    public EventBase? Event { get; set; }
    public Guid EventId { get; set; }

    

    public static MediaLink? Create(string content, string? orgName, Guid eventId)
    {
        if(!content.StartsWith("https://"))
        {
            Console.WriteLine("Неправильная ссылка");
            return null;
        }
        Console.WriteLine("Создали новую ссылку");

        orgName = string.IsNullOrEmpty(orgName) ?
            null :
            orgName;

        return new (content, orgName, eventId);
    }
}
