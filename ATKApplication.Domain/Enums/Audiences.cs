using System.Runtime.Serialization;

namespace ATKApplication.Domain.Enums
{
    public enum Audiences
    {
        [EnumMember(Value = "Дошкольники")]
        preschoolers = 1,

        [EnumMember(Value = "Школьники")]
        schoolChildren = 2,

        [EnumMember(Value = "Молодежь")]
        youth = 3,

        [EnumMember(Value = "Люди пенионного возраста")]
        pensioners = 4,

        [EnumMember(Value = "Работающее население")]
        workingPopulation = 5,

        [EnumMember(Value = "Другое")]
        other = 6,
    }
}