using ATKApplication.Enums;
using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record CreateFeedBackRequest(string? Description, /*string[]?*/ FeedBackTypes[] FeedBackTypes);


    public enum FeedBackTypes
    {
        [EnumMember(Value = "Анкетирование")]
        Guestionnaire,
        [EnumMember(Value = "Онлайн-опрос")]
        Internet,
        [EnumMember(Value = "Опрос")]
        Opros,
        [EnumMember(Value = "Интервью")]
        Interview,
    }
}