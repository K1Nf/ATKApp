using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record CreateInterAgencyCooperationRequest(Dictionary<string, SelectedOrganizations>? SelectedOrganizations, 
                                                        List<CustomOrganizations?>? CustomOrganizations);

    public class SelectedOrganizations
    {
        public string Role { get; set; }
        public string Description { get; set; }
    }


    public class CustomOrganizations
    {
        public string Name { get; set; }
        public string Role { get; set; }
        public string Description { get; set; }
    }


    public enum CoOpOrganiations
    {
        [EnumMember(Value = "Другое")]
        Custom = 0,
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
        [EnumMember(Value = "Не определено")]
        Undefined = 8,
    }

    //public enum PerformanceType
    //{
    //    [EnumMember(Value = "Участие")]
    //    TakePart = 1,
    //    [EnumMember(Value = "Выступление")]
    //    Perform = 2,
    //}
}