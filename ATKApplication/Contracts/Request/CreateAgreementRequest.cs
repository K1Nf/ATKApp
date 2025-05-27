using ATKApplication.Enums;

namespace ATKApplication.Contracts.Request
{
    public record CreateAgreementRequest(List<AgreementRequest> Agreements);

    public class AgreementRequest
    {
        public string Name { get; set; }
        public ResultEnum Result { get; set; }
        public string? Description { get; set; }
    }
}
