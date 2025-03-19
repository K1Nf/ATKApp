using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
    public enum LevelType
    {
        [EnumMember(Value = "Муниципальное")] 
        Municipal,
        [EnumMember(Value = "Межмуниципальное")] 
        InterMunicipal,
        [EnumMember(Value = "Региональное")] 
        Regional
    }
}
