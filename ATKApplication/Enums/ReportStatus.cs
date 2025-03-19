using System.Runtime.Serialization;

namespace ATKApplication.Enums;
public enum ReportStatus
{
    [EnumMember(Value = "Создано")]
    Created,
    [EnumMember(Value = "Заполнено")]
    FilledIn,
    [EnumMember(Value = "Отправлено")]
    Sent
}