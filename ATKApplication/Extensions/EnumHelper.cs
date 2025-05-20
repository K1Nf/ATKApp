using System.Reflection;
using System.Runtime.Serialization;

namespace ATKApplication.Extensions
{
    public static class EnumHelper
    {
        public static TEnum? GetEnumValueFromEnumMemberValue<TEnum>(string? value) where TEnum : struct, Enum
        {
            if (value == null) return null;

            foreach (var field in typeof(TEnum).GetFields())
            {
                var attribute = field.GetCustomAttribute<EnumMemberAttribute>();
                if (attribute != null && attribute.Value == value)
                {
                    return (TEnum)field.GetValue(null)!;
                }
            }

            return null; // или throw, если значение обязательно
        }
    }
}
