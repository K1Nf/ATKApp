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

    
}
