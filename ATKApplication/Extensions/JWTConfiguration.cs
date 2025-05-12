﻿namespace ATKApplication.Extensions
{
    public class JWTConfiguration
    {
        public string Issuer { get; set; } = string.Empty;
        public string Audience { get; set; } = string.Empty;
        public int ExpiresMinutes { get; set; } = 120;
        public string SecretKey { get; set; } = string.Empty;
        public string UserIdentity { get; set; } = string.Empty;
    }
}
