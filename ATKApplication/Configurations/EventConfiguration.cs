﻿using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Configurations
{
    public class EventConfiguration : IEntityTypeConfiguration<Event>
    {
        public void Configure(EntityTypeBuilder<Event> builder)
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

            //builder.HasOne(e => e.Plan)
            //    .WithMany(e => e.Events);

            builder.HasMany(e => e.ReportAndEvents)
                .WithOne(f => f.Event);



            builder.HasOne(e => e.FeedBack)
                .WithOne(f => f.Event)
                .HasForeignKey(typeof(FeedBack))
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(e => e.Finance)
                .WithOne(f => f.Event)
                .HasForeignKey(typeof(Finance))
                .OnDelete(DeleteBehavior.Cascade);

            

            builder.HasMany(e => e.MediaLinks)
                .WithOne(m => m.Event);

            builder.HasOne(e => e.Category)
                .WithOne(f => f.Event)
                .HasForeignKey(typeof(Category))
                .OnDelete(DeleteBehavior.Cascade);


            //builder.HasMany(e => e.CategoryAndEvents)
            //    .WithOne(c => c.Event);

            builder.HasMany(e => e.InterAgencyCooperations)
                .WithOne(c => c.Event)
                .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
