using ATKApplication.Enums;
using ATKApplication.Models;

namespace ATKApplication.Extensions
{
    public class FilterEntity
    {
        public string? Name { get; set; }
        public string? Content { get; set; }
        public string? ThemeCode { get; set; }
        public Guid? OrganizerId { get; set; }
        public LevelType? Level { get; set; }
        public EventType? Form { get; set; }
        public bool? IsValuable { get; set; }
        public bool? IsBestPractice { get; set; }
        public List<Sort?> Orders { get; set; } = [];
    }
    public record Sort(string Key, bool OrderBy);
}
