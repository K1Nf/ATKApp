using ATKApplication.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Infrastructure.Configurations
{
    public class InterAgencyCooperationConfiguration : IEntityTypeConfiguration<InterAgencyCooperation>
    {
        public void Configure(EntityTypeBuilder<InterAgencyCooperation> builder)
        {

            builder.HasKey(e => e.Id);
        }
    }
}