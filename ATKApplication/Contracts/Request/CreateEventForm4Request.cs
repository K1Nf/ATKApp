using ATKApplication.Enums;
using ATKApplication.Models;
using System.Diagnostics.Eventing.Reader;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventForm4Request(string Name, string Content, string Actor, 
                                          string Date, bool DirectToNAC, 
                                          string? SendToSubjects, string ThemeCode,
                                          CreateAgreementRequest? CreateAgreementRequest,
                                          CreateMediaLinkRequest? CreateMediaLinkRequest,
                                          CreateParticipantsRequest? CreateParticipantsRequest
       );


    public record CreateAgreementRequest(List<AgreementRequest> Agreements);

    public class AgreementRequest
    {
        public string Name { get; set; }
        public ResultEnum Result {get; set;}
        public string? Description {get; set;}    
    }
}
