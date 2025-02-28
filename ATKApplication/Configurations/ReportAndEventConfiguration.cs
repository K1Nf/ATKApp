using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Configurations
{
    public class ReportAndEventConfiguration : IEntityTypeConfiguration<ReportAndEvent>
    {
        public void Configure(EntityTypeBuilder<ReportAndEvent> builder)
        {

            builder.HasKey(e => new { e.ReportId, e.EventId });
        }
    }

    public class InterAgencyCooperationConfiguration : IEntityTypeConfiguration<InterAgencyCooperation>
    {
        public void Configure(EntityTypeBuilder<InterAgencyCooperation> builder)
        {

            builder.HasKey(e => new { e.OrganizerId, e.EventId });
        }
    }
}