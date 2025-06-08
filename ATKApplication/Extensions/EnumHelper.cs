using ATKApplication.Contracts.Request;
using System.Reflection;
using System.Runtime.Serialization;
using System.Xml.Linq;

namespace ATKApplication.Extensions
{
    public static class EnumHelper
    {
        public static TEnum? GetEnumValueFromEnumMemberValue<TEnum>(string? value) where TEnum : struct, Enum
        {
            if (value == null) return null;

            foreach (var field in typeof(TEnum).GetFields())
            {
                if (value == field.Name)
                {
                    TEnum res = (TEnum)field.GetValue(null)!;

                    return res;
                }
            }
            return null; // или throw, если значение обязательно
        }

        public static string? GetEnumMemberValueByName<TEnum>(string enumName) where TEnum : Enum
        {
            var type = typeof(TEnum);
            var member = type.GetMember(enumName).FirstOrDefault();
            if (member == null) return null;


            string str1 = member.Name;
            string str2 = Violations.law_other.ToString();
            if (str1 == str2) 
                
                return null;



            var attr = member.GetCustomAttribute<EnumMemberAttribute>();
            return attr?.Value;
        }


        public static TEnum? GetEnumValueFromEnumMember<TEnum>(string value) where TEnum : struct, Enum
        {
            foreach (var field in typeof(TEnum).GetFields(BindingFlags.Public | BindingFlags.Static))
            {
                var attr = field.GetCustomAttribute<EnumMemberAttribute>();
                if (attr?.Value == value)
                    return Enum.Parse<TEnum>(field.Name);
            }

            return null;
        }

    }
}
