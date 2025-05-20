namespace ATKApplication.Contracts.Request
{
    public record CreateSupportRequest(string Supported, Dictionary<SupportType, string> Supports);


    //public class SupportDTO
    //{
    //    public SupportType Support { get; set; }
    //    public string Description { get; set; }
    //}
}