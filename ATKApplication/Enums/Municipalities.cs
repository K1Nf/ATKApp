using System.Runtime.Serialization;

namespace ATKApplication.Enums
{
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