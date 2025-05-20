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
        public string? Name { get; set; } // if custom
        public int Count { get; set; }
    }


    public enum Categories 
    {
        [EnumMember(Value = "Другое")] // custom
        Custom = 0,
        
        [EnumMember(Value = "Школьники")]
        SchoolKids = 1,
        
        [EnumMember(Value = "Студенты")]
        Students = 2,
        
        [EnumMember(Value = "Состоящие на учете")]
        RegisteredPersons = 3,
        
        [EnumMember(Value = "Трудовые мигранты")]
        Trudmigrants = 4,
        
        [EnumMember(Value = "Работающая молодежь")]
        WorkingYouth = 5,
        
        [EnumMember(Value = "Неработающая молодежь")]
        UnemployedYouth = 6,
        
        [EnumMember(Value = "Мигранты студенты")]
        MigrantStudents = 7,
        
        [EnumMember(Value = "Дети мигрантов (в ОУ)")]
        MigrantChildrenInSchools = 8,
        
        [EnumMember(Value = "Дети мигрантов (дом.)")]
        MigrantChildrenHome = 9,
        
        [EnumMember(Value = "Жители новых субъектов РФ")]
        NewSubjectsResidents = 10,
        
        [EnumMember(Value = "Школьники на учете")]
        RegisteredSchoolKids = 11,
        
        [EnumMember(Value = "Молодежь на учете")]
        RegisteredYouth = 12,
        
        [EnumMember(Value = "Возвратившиеся из зон БД")]
        ReturnedFromCombatZones = 13,
        
        [EnumMember(Value = "Субкультуры")]
        SubcultureYouth = 14,
        
        [EnumMember(Value = "Молодежь с суиц. наклонностями")]
        SuicidalChildren = 15,

        [EnumMember(Value = "Без категории/тотал. количество")]
        NoCategory = 20, // if only total
    }
}