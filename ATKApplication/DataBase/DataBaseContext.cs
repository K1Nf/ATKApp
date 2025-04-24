using ATKApplication.Configurations;
using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


namespace ATKApplication.DataBase
{
    public class DataBaseContext : DbContext
    {
        public DbSet<Event> Events { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<Organization> Organizations { get; set; }

        public DbSet<Theme> Themes { get; set; }
        public DbSet<MediaLink> MediaLinks { get; set; }
        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<Finance> Finances { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ReportAndEvent> ReportAndEvents { get; set; }

        public DbSet<InterAgencyCooperation> InterAgencyCooperations { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=AtkTest;Username=postgres;Password=root");
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));


            optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EventConfiguration());
            modelBuilder.ApplyConfiguration(new ReportAndEventConfiguration());
            modelBuilder.ApplyConfiguration(new InterAgencyCooperationConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}