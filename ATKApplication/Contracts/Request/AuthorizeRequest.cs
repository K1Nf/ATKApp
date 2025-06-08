using ATKApplication.Models;
using System.Runtime.Serialization;

namespace ATKApplication.Contracts.Request
{
    public record AuthorizeRequest(AllMunicipalityOrganizations OrganizationName, string Password);

    public enum AllMunicipalityOrganizations
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

    public enum Municipalities
    {
        [EnumMember(Value = "ATK-ХМАО")]
        noMunicipality = 0, // for atk_khmao

        [EnumMember(Value = "Белоярский район")]
        Beloyarskiy_rayon = 1,                                               //khanty_mansiysk

        [EnumMember(Value = "Березовский район")]
        Berezovskiy_rayon = 2,

        [EnumMember(Value = "Кондинский район")]
        Condinskiy_rayon = 3,

        [EnumMember(Value = "Нефтеюганский район")]
        Nefteyuganskiy_rayon = 4,

        [EnumMember(Value = "Нижневартовский район")]
        Nizhnevartovskiy_rayon = 5,

        [EnumMember(Value = "Октябрьский район")]
        Oktyabrskiy_rayon = 6,

        [EnumMember(Value = "Советский район")]
        Sovietskiy_rayon = 7,

        [EnumMember(Value = "Сургутский район")]
        Surgutskiy_rayon = 8,

        [EnumMember(Value = "Ханты-Мансийский район")]
        Khanty_mansiyskiy_rayon = 9,

        [EnumMember(Value = "Когалымский район")]
        Kogalym = 10,

        [EnumMember(Value = "г. Лангепас")]
        Langepas = 11,

        [EnumMember(Value = "г. Мегион")]
        Megion = 12,

        [EnumMember(Value = "г. Нефтеюганск")]
        Nefteyugansk = 13,

        [EnumMember(Value = "г. Нижневартовск")]
        Nizhnevartovsk = 14,

        [EnumMember(Value = "г. Нягань")]
        Nyagan = 15,

        [EnumMember(Value = "г. Покачи")]
        Pokachi = 16,

        [EnumMember(Value = "г. Пыть-Ях")]
        Pyth_yach = 17,

        [EnumMember(Value = "г. Радужный")]
        Raduzhnyi = 18,

        [EnumMember(Value = "г. Сургут")]
        Surgut = 19,

        [EnumMember(Value = "г. Урай")]
        Urai = 20,

        [EnumMember(Value = "г. Ханты-Мансийск")]
        Khanty_mansiysk = 21,

        [EnumMember(Value = "г. Югорск")]
        Yugorsk = 22,
    }
}