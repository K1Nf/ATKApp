namespace ATKApplication.Contracts.Request
{
    public record CreateInterAgencyCooperationRequest(/*Dictionary<string, EventDetailDto> */ List<CoopOrgs?>? Content);

    public class CoopOrgs(string? name, string? role, string? description)
    {
        public string? Name { get; set; } = name;
        public string? Role { get; set; } = role;
        public string? Description { get; set; } = description;
    }

    public class EventDetailDto
    {
        public string Type { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
