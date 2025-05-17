using ATKApplication.Enums;
using ATKApplication.Models;
using System.Diagnostics.Eventing.Reader;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventForm4Request(string Name, string Content, string Actor, 
                                          string Date, bool DirectToNAC, string DirectToSubjects,
                                          string EqualToEqual, string ThemeCode,
                                          CreateAgreementRequest? CreateAgreementRequest,
                                          CreateMediaLinkRequest? CreateMediaLinkRequest,
                                          CreateParticipantsRequest? CreateParticipantsRequest
       );


    public record CreateAgreementRequest(List<AgreementRequest> AgreementRequests);

    public class AgreementRequest
    {
        public OrganizationEnum OrganizationEnum { get; set; }
        public ResultEnum Result {get; set;}
        public string Description {get; set;}    
    }
}
