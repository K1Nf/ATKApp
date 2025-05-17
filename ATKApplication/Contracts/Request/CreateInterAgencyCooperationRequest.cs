using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record CreateInterAgencyCooperationRequest(List<CoopOrgs> Content);

    public class CoopOrgs
    {
        public CoOpOrganiations CoOpOrganiations { get; set; }
        public string CustomOrganizationName { get; set; }
        public PerformanceType Type { get; set; }
        public string Description { get; set; }
    }

    public enum CoOpOrganiations
    {
        [EnumMember(Value = "Другое")]
        Other = 0,
        [EnumMember(Value = "Аппарат АТК-ХМАО")]
        ATK_KHMAO = 1,
        [EnumMember(Value = "Аппарат АТК-ОНСУ")]
        ATK_ONSU = 2,
        [EnumMember(Value = "СОНКО")]
        SONKO = 3,
        [EnumMember(Value = "ОМВД по ОНСУ")]
        OMVD_ONSU = 4,
        [EnumMember(Value = "СВО")]
        SVO = 5,
        [EnumMember(Value = "ЛОМЫ")]
        LOMY = 6,
        [EnumMember(Value = "Представители религиозных организаций традиционных для России конфессий")]
        Religia = 7,
    }

    public enum PerformanceType
    {
        [EnumMember(Value = "Участие")]
        TakePart = 1,
        [EnumMember(Value = "Выступление")]
        Perform = 2,
    }
}