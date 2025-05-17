using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
    public enum OrganizationEnum
    {
        [EnumMember(Value = "АТК-ОМСУ")]
        ATK_OMSU = 1,

        [EnumMember(Value = "АТК-ХМАО Югры")]
        ATK_KHMAO = 2,

        [EnumMember(Value = "Экспертный совет при АТК-ХМАО Югры")]
        ExpertSoviet_ATK_KHMAO = 3,
    }
}
