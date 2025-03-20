using System.Runtime.Serialization;

namespace ATKApplication.Models
{
    public enum EventType
    {
        [EnumMember(Value = "Лекция")] 
        Lecture,
        [EnumMember(Value = "Квиз")] 
        Quiz, 
        [EnumMember(Value = "Акция")] 
        Action, 
        [EnumMember(Value = "Игра")] 
        Game,
        [EnumMember(Value = "Квест")]
        quest,
        [EnumMember(Value = "Другое")] 
        Other
    }
}
