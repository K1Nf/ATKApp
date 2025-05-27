using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
    public enum OrganizationEnum
    {
        [EnumMember(Value = "АТК-ОМСУ")]
        atkomsu = 1,

        [EnumMember(Value = "АТК-ХМАО Югры")]
        atkkhmao = 2,

        [EnumMember(Value = "Экспертный совет при АТК-ХМАО Югры")]
        expertSoviet = 3,
    }
}
