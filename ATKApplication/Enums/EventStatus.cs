using System.ComponentModel;
using System.Runtime.Serialization;
using System.Text.Json.Serialization;

namespace ATKApplication.Models
{
    public enum EventStatus
    {
        [EnumMember(Value = "Запланировано")]
        Planned,
        [EnumMember(Value = "Завершено")]
        Completed,
        [EnumMember(Value = "Отменено")]
        Cancelled
    }
}
