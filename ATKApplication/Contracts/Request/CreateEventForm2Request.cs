using ATKApplication.Domain.Enums;
using ATKApplication.Domain.Models;
using System.Diagnostics.Eventing.Reader;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventForm2Request(string Name, string Content, string Actor, string Date,
                                          string ThemeCode, string Request, string Description,
                                          string ResultDescription, string Participant,
                                          CreateMediaLinkRequest? CreateMediaLinkRequest,
                                          CreateParticipantsRequest? CreateParticipantsRequest);
}