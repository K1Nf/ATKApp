namespace ATKApplication.Contracts.Request
{
    public record CreateEventBaseRequest(string Name, string Actor, string Content, 
                                        string Date, Guid OrganizerId, string ThemeCode,
                                        CreateParticipantsRequest? CreateParticipantsRequest,
                                        CreateMediaLinkRequest? CreateMediaLinkRequest);

}
