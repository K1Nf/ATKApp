using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Configurations
{
    public class EventForm5Configuration : IEntityTypeConfiguration<EventForm5>
    {
        public void Configure(EntityTypeBuilder<EventForm5> builder)
        {
            builder.HasOne(e => e.Agreement)
                .WithOne(c => c.Event)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
