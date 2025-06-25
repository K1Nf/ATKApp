using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Domain.Enums
{
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
}
