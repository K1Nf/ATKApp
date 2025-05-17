using ATKApplication.Enums;
using ATKApplication.Models;
using System.Diagnostics.Eventing.Reader;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventForm3Request(string Name, string Content, string Actor, 
                                          string Date, string ThemeCode, string Direct,
                                          int MaterialsCount, string Result, 
                                          CreateMediaLinkRequest? CreateMediaLinkRequest,
                                          CreateParticipantsRequest? CreateParticipantsRequest);
}
