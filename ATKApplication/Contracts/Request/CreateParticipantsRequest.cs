using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record CreateParticipantsRequest(List<CustomCategory> CustomCategories, List<SelectedCategory> SelectedCategories, int Total);

    public class CustomCategory
    {
        public string? Label { get; set; } // if custom
        public int Count { get; set; }
    }

    public class SelectedCategory
    {
        public string Name { get; set; } // if custom
        public int Count { get; set; }
    }


    public enum Categories 
    {
        [EnumMember(Value = "Другое")] // custom
        Custom = 0,
        
        [EnumMember(Value = "Школьники")]
        schoolKids = 1,
        
        [EnumMember(Value = "Студенты")]
        students = 2,
        
        [EnumMember(Value = "Состоящие на учете")]
        registeredPersons = 3,
        
        [EnumMember(Value = "Трудовые мигранты")]
        trudmigrants = 4,
        
        [EnumMember(Value = "Работающая молодежь")]
        workingYouth = 5,
        
        [EnumMember(Value = "Неработающая молодежь")]
        unemployedYouth = 6,
        
        [EnumMember(Value = "Мигранты студенты")]
        migrantStudents = 7,
        
        [EnumMember(Value = "Дети мигрантов (в ОУ)")]
        migrantChildrenInSchools = 8,
        
        [EnumMember(Value = "Дети мигрантов (дом.)")]
        migrantChildrenHome = 9,
        
        [EnumMember(Value = "Жители новых субъектов РФ")]
        newSubjectsResidents = 10,
        
        [EnumMember(Value = "Школьники на учете")]
        registeredSchoolKids = 11,
        
        [EnumMember(Value = "Молодежь на учете")]
        registeredYouth = 12,
        
        [EnumMember(Value = "Возвратившиеся из зон БД")]
        returnedFromCombatZones = 13,
        
        [EnumMember(Value = "Субкультуры")]
        subcultureYouth = 14,
        
        [EnumMember(Value = "Молодежь с суиц. наклонностями")]
        suicidalChildren = 15,

        [EnumMember(Value = "Общее количество")]
        NoCategory = 20, // if only total
    }
}