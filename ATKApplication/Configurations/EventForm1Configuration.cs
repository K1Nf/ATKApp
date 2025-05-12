using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Configurations
{
    public class EventForm1Configuration : IEntityTypeConfiguration<EventForm2>
    {
        public void Configure(EntityTypeBuilder<EventForm2> builder)
        {
            builder.HasOne(e => e.FeedBack)
                .WithOne(f => f.Event)
                .HasForeignKey(typeof(FeedBack))
                .OnDelete(DeleteBehavior.Cascade);


            builder.HasOne(e => e.Finance)
                .WithOne(f => f.Event)
                .HasForeignKey(typeof(Finance))
                .OnDelete(DeleteBehavior.Cascade);
            
            
            builder.HasMany(e => e.InterAgencyCooperations)
                .WithOne(c => c.Event)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
