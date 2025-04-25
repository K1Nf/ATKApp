using ATKApplication.Configurations;
using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;


namespace ATKApplication.DataBase
{
    public class DataBaseContext : DbContext
    {
        public DbSet<EventBase> EventsBase { get; set; }
        public DbSet<EventForm1> EventForm1s { get; set; }
        public DbSet<EventForm3> EventForm3s { get; set; }
        public DbSet<EventForm4> EventForm4s { get; set; }
        public DbSet<EventForm5> EventForm5s { get; set; }


        public DbSet<Organization> Organizations { get; set; }
        public DbSet<Theme> Themes { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<MediaLink> MediaLinks { get; set; }


        public DbSet<FeedBack> FeedBacks { get; set; }
        public DbSet<Finance> Finances { get; set; }


        public DbSet<InterAgencyCooperation> InterAgencyCooperations { get; set; }
        public DbSet<Support> Supports { get; set; }
        public DbSet<Agreement> Agreements { get; set; }



        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=AtkTest;Username=postgres;Password=Fnaticwinner");
            optionsBuilder.ConfigureWarnings(warnings => warnings.Ignore(RelationalEventId.PendingModelChangesWarning));


            optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EventBaseConfiguration());
            modelBuilder.ApplyConfiguration(new EventForm1Configuration());
            modelBuilder.ApplyConfiguration(new EventForm5Configuration());
            modelBuilder.ApplyConfiguration(new InterAgencyCooperationConfiguration());
            modelBuilder.ApplyConfiguration(new ThemeConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}