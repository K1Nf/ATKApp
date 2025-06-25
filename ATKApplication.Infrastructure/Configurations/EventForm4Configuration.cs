using ATKApplication.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Infrastructure.Configurations
{
    public class EventForm4Configuration : IEntityTypeConfiguration<EventForm4>
    {
        public void Configure(EntityTypeBuilder<EventForm4> builder)
        {
            builder.HasMany(e => e.Agreements)
                .WithOne(c => c.Event)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
