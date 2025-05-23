using ATKApplication.Enums;

namespace ATKApplication.Contracts.Request
{
    public record CreateSupportRequest(string? Supported, List<SupportDto> Supports);

    public class SupportDto
    {
        public SupportType Key { get; set; }
        public string? Description {get; set;}
    }
}