using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
    public enum SupportType
    {
        [EnumMember(Value = "Информационная")]
        Info = 1,

        [EnumMember(Value = "Методическая")]
        Method = 2,

        [EnumMember(Value = "Организационная")]
        Org = 3,

        [EnumMember(Value = "Финансовая")]
        Financing = 4,

        [EnumMember(Value = "Другая")]
        Other = 5,

        [EnumMember(Value = "Социальная")]
        socialSupport = 6,

        [EnumMember(Value = "Информационно-разъяснительная")]
        infoEvent = 7,
    }
}