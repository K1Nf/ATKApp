using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace ATKApplication.Domain.Enums
{
    public enum Violations
    {
        [EnumMember(Value = "УМВД")]
        umvd,

        [EnumMember(Value = "РУФСБ")]
        fsb,

        [EnumMember(Value = "Прокуратура")]
        prosecutor,

        [EnumMember(Value = "Роскомнадзор")]
        roskomnadzor,

        [EnumMember(Value = "1. Включенные в Федеральный список запрещенной экстремистской литературы.")]
        law_15_1,

        [EnumMember(Value = "2. Пункт к) статьи 15.1 — Изготовление ВВ, оружия и боеприпасов (кроме гражданского)")]
        law_15_1_k,

        [EnumMember(Value = "3. Пункт 1) статьи 15.3 — Призывы к массовым беспорядкам, экстремизму")]
        law_15_3_1,

        [EnumMember(Value = "4. Пункт 2) статьи 15.3 — Ложные сообщения об актах терроризма")]
        law_15_3_2,

        [EnumMember(Value = "5. Пункт 3) статьи 15.3 — Недостоверная информация об использовании ВС РФ")]
        law_15_3_3,

        [EnumMember(Value = "6. Пункт 4) статьи 15.3 — Финансирование противника")]
        law_15_3_4,

        [EnumMember(Value = "7. Пункт 6) статьи 15.3 — Оправдание/обоснование экстремистской деятельности")]
        law_15_3_6,

        [EnumMember(Value = "8. Пункт 8) статьи 15.3 — Материалы организаций, признанных нежелательными в РФ")]
        law_15_3_8,

        [EnumMember(Value = "9. Другая информация")]
        law_other,
    }
}
