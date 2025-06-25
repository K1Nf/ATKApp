using System.Runtime.Serialization;

namespace ATKApplication.Domain.Enums
{
    public enum ResultEnum
    {
        [EnumMember(Value = "Отказано")]
        Rejected = 0,
        [EnumMember(Value = "Утверждено")]
        Approved = 1,
    }
}
