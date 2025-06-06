using ATKApplication.Models;
using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record AuthorizeRequest(MunicipalOrganizations SelectedOrganization, string Password);

    public enum MunicipalOrganizations
    {
        [EnumMember(Value = "АТК-ХМАО Югры")]
        atk_khmao = 0,
        
        [EnumMember(Value = "АТК Белоярский район")]
        atk_beloyarskiy_rayon = 1,                                               //atk_khanty_mansiysk
        
        [EnumMember(Value = "АТК Березовский район")]
        atk_berezovskiy_rayon = 2,
        
        [EnumMember(Value = "АТК Кондинский район")]
        atk_condinskiy_rayon = 3,
        
        [EnumMember(Value = "АТК Нефтеюганский район")]
        atk_nefteyuganskiy_rayon = 4,
        
        [EnumMember(Value = "АТК Нижневартовский район")]
        atk_nizhnevartovskiy_rayon = 5,
        
        [EnumMember(Value = "АТК Октябрьский район")]
        atk_oktyabrskiy_rayon = 6,
        
        [EnumMember(Value = "АТК Советский район")]
        atk_sovietskiy_rayon = 7,
        
        [EnumMember(Value = "АТК Сургутский район")]
        atk_surgutskiy_rayon = 8,
        
        [EnumMember(Value = "АТК Ханты-Мансийский район")]
        atk_khanty_mansiyskiy_rayon = 9,
        
        [EnumMember(Value = "АТК Когалым район")]
        atk_kogalym = 10,
        
        [EnumMember(Value = "АТК г. Лангепас")]
        atk_langepas = 11,
        
        [EnumMember(Value = "АТК г. Мегион")]
        atk_megion = 12,
        
        [EnumMember(Value = "АТК г. Нефтеюганск")]
        atk_nefteyugansk = 13,
        
        [EnumMember(Value = "АТК г. Нижневартовск")]
        atk_nizhnevartovsk = 14,
        
        [EnumMember(Value = "АТК г. Нягань")]
        atk_nyagan = 15,
        
        [EnumMember(Value = "АТК г. Покачи")]
        atk_pokachi = 16,
        
        [EnumMember(Value = "АТК г. Пыть-Ях")]
        atk_pyth_yach = 17,
        
        [EnumMember(Value = "АТК г. Радужный")]
        atk_raduzhnyi = 18,
        
        [EnumMember(Value = "АТК г. Сургут")]
        atk_surgut = 19,
        
        [EnumMember(Value = "АТК г. Урай")]
        atk_urai = 20,
        
        [EnumMember(Value = "АТК г. Ханты-Мансийск")]
        atk_khanty_mansiysk = 21,
        
        [EnumMember(Value = "АТК г. Югорск")]
        atk_yugorsk = 22,
    }
}