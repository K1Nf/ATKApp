using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
    public enum FeedBackType
    {
        [EnumMember(Value = "Анкетирование")] 
        Guestionnaire,  //анкета
        [EnumMember(Value = "Онлайн-опрос")] 
        Internet        //
    }
}
