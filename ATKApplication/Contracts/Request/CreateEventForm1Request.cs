using ATKApplication.Enums;
using ATKApplication.Models;
using System.Diagnostics.Eventing.Reader;
using System.Globalization;

namespace ATKApplication.Contracts.Request
{
    public record CreateEventForm1Request(string? Name, string? Content, string? Actor, 
                            string? Date, EventType? Form, LevelType? Level, 
                            string ThemeCode, bool? IsValuable, bool? IsBestPractice,
                            string? Result, string? Decision,
                            string? EqualToEqual,
                            CreateMediaLinkRequest? CreateMediaLinkRequest, 
                            CreateFinanceRequest? CreateFinanceRequest, 
                            CreateFeedBackRequest? CreateFeedBackRequest,
                            CreateSupportRequest? CreateSupportRequest,
                            CreateParticipantsRequest? CreateParticipantsRequest, 
                            CreateAudienceRequest? CreateAudienceRequest, 
                            CreateInterAgencyCooperationRequest? CreateInterAgencyCooperationRequest,
                            CreateSourcesOfDistributionRequest? CreateSourcesOfDistributionRequest,
                            CreateConcourseRequest? CreateConcourseRequest ); 
}
