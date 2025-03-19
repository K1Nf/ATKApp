using System.Runtime.Serialization;

namespace ATKApplication.Enums;
public enum PlanStatus
{
    [EnumMember(Value = "Создано")] 
    Created, 
    [EnumMember(Value = "Заполнено")] 
    FilledIn, 
    [EnumMember(Value = "Отправлено")] 
    Sent
}

