using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
    public enum ResultEnum
    {
        [EnumMember(Value = "Отказано")]
        Denied = 1,
        [EnumMember(Value = "Принято")]
        Accepted = 2
    }
}
