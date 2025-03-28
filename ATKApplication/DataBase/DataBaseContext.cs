using ATKApplication.Configurations;
using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;


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
<<<<<<< HEAD
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=AtkTest;Username=postgres;Password=Fnaticwinner");
=======
            optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=AtkTest;Username=postgres;Password=root");
>>>>>>> 08be05627de4d01275457645fb3c13175de0be6d

            optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new EventConfiguration());
            //modelBuilder.ApplyConfiguration(new CategoryAndEventConfiguration());
            modelBuilder.ApplyConfiguration(new ReportAndEventConfiguration());
            modelBuilder.ApplyConfiguration(new InterAgencyCooperationConfiguration());


<<<<<<< HEAD
            
=======

>>>>>>> 08be05627de4d01275457645fb3c13175de0be6d
            base.OnModelCreating(modelBuilder);
        }
    }
}