using System.Runtime.Serialization;

namespace ATKApplication.Domain.Enums
{
    public enum LevelType
    {
        [EnumMember(Value = "Учреждение")]
        institution,
        [EnumMember(Value = "Муниципальное")]
        municipality,
        [EnumMember(Value = "Межмуниципальное")]
        intermunicipality,
        [EnumMember(Value = "Региональное")]
        regional,
        [EnumMember(Value = "Межрегиональное")]
        interregional,
        [EnumMember(Value = "Всероссийское")]
        all_russian,
        [EnumMember(Value = "Международное")]
        international
    }
}
