namespace ATKApplication.Contracts.Request
{
    public record CreateEventBaseRequest(string Name, string Actor, string Content, 
                                        string Date, string ThemeCode,
                                        CreateParticipantsRequest? CreateParticipantsRequest,
                                        CreateMediaLinkRequest? CreateMediaLinkRequest);

}
