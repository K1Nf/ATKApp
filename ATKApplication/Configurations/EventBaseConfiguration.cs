using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Configurations
{
    public class EventBaseConfiguration : IEntityTypeConfiguration<EventBase>
    {
        public void Configure(EntityTypeBuilder<EventBase> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.Name)
                .HasMaxLength(100);
            
            builder.Property(e => e.Content)
                .HasMaxLength(150);

            

            builder.HasOne(e => e.Organizer)
                .WithMany(e => e.Events);
            
            builder.HasOne(e => e.Theme)
                .WithMany(e => e.Events);
            
            
            
            builder.HasMany(e => e.MediaLinks)
                .WithOne(m => m.Event);
            
            builder.HasMany(e => e.Categories)
                .WithOne(f => f.Event)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
