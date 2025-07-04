﻿using ATKApplication.Domain.Enums;
using ATKApplication.Domain.Models;

namespace ATKApplication.Contracts.Response
{
    public record ShortEventResponse
    {
        public Guid Id { get; init; }
        public string ThemeCode { get; init; }
        public string? Name { get; init; }
        public string? Date { get; init; }
        public int? ParticipantsCount { get; init; }
        public string? Content { get; init; }
        public string[]? Links { get; init; }
        //public string Actor { get; init; }
        public StructuredOrganizations OrganizerName { get; init; }
    }
}
