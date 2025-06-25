using ATKApplication.Domain.Enums;
using ATKApplication.Infrastructure.Extensions;
using ATKApplication.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.Extensions.Logging;

namespace ATKApplication.Infrastructure.Configurations
{
    public class OrganizationConfiguration : IEntityTypeConfiguration<Organization>
    {
        private readonly PasswordHasher hasher = new();
        public void Configure(EntityTypeBuilder<Organization> builder)
        {
            builder.HasKey(o => o.Id);

            builder.Property(o => o.Name)
                .IsRequired()
                .HasConversion<string>(); // <-- Конвертация enum в строку

            builder.Property(o => o.Municipality)
                .IsRequired()
                .HasConversion<string>(); // <-- Конвертация enum в строку

            builder.HasMany(o => o.Events)
                .WithOne(e => e.Organizer)
                .HasForeignKey(e => e.OrganizerId)
                .OnDelete(DeleteBehavior.SetNull);

            //builder.HasData(GetMunicipalityOrgs());
            builder.HasData(GetDepartmentsOrgs());
        }

        public List<Organization> GetMunicipalityOrgs() => [

            Organization.Create(StructuredOrganizations.atk_khmao,
            hasher.HashPassword("atk_khmao"),
            Municipalities.noMunicipality),


            Organization.Create(StructuredOrganizations.atk_beloyarskiy_rayon,
            hasher.HashPassword("atkbelray"),
            Municipalities.Beloyarskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_berezovskiy_rayon,
            hasher.HashPassword("atkberray"),
            Municipalities.Berezovskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_condinskiy_rayon,
            hasher.HashPassword("atkconray"),
            Municipalities.Condinskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_khanty_mansiysk,
            hasher.HashPassword("atkkhm"),
            Municipalities.Khanty_mansiysk),

            Organization.Create(StructuredOrganizations.atk_khanty_mansiyskiy_rayon,
            hasher.HashPassword("atkkhmray"),
            Municipalities.Khanty_mansiyskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_kogalym,
            hasher.HashPassword("atkkog"),
            Municipalities.Kogalym),

            Organization.Create(StructuredOrganizations.atk_langepas,
            hasher.HashPassword("atklan"),
            Municipalities.Langepas),

            Organization.Create(StructuredOrganizations.atk_megion,
            hasher.HashPassword("atkmeg"),
            Municipalities.Megion),

            Organization.Create(StructuredOrganizations.atk_nefteyugansk,
            hasher.HashPassword("atkneft"),
            Municipalities.Nefteyugansk),

            Organization.Create(StructuredOrganizations.atk_nefteyuganskiy_rayon,
            hasher.HashPassword("atkneftray"),
            Municipalities.Nefteyuganskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_nizhnevartovsk,
            hasher.HashPassword("atknizh"),
            Municipalities.Nizhnevartovsk),

            Organization.Create(StructuredOrganizations.atk_nizhnevartovskiy_rayon,
            hasher.HashPassword("atknizhray"),
            Municipalities.Nizhnevartovskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_nyagan,
            hasher.HashPassword("atknya"),
            Municipalities.Nyagan),

            Organization.Create(StructuredOrganizations.atk_oktyabrskiy_rayon,
            hasher.HashPassword("atkoktray"),
            Municipalities.Oktyabrskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_pokachi,
            hasher.HashPassword("atkpok"),
            Municipalities.Pokachi),

            Organization.Create(StructuredOrganizations.atk_pyth_yach,
            hasher.HashPassword("atkpyth"),
            Municipalities.Pyth_yach),

            Organization.Create(StructuredOrganizations.atk_raduzhnyi,
            hasher.HashPassword("atkrad"),
            Municipalities.Raduzhnyi),

            Organization.Create(StructuredOrganizations.atk_sovietskiy_rayon,
            hasher.HashPassword("atksovray"),
            Municipalities.Sovietskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_surgut,
            hasher.HashPassword("atksur"),
            Municipalities.Surgut),

            Organization.Create(StructuredOrganizations.atk_surgutskiy_rayon,
            hasher.HashPassword("atksurray"),
            Municipalities.Surgutskiy_rayon),

            Organization.Create(StructuredOrganizations.atk_urai,
            hasher.HashPassword("atkurai"),
            Municipalities.Urai),

            Organization.Create(StructuredOrganizations.atk_yugorsk,
            hasher.HashPassword("atkyug"),
            Municipalities.Yugorsk)
        ];



        public List<Organization> GetDepartmentsOrgs() => [

            Organization.Create(StructuredOrganizations.khanty_mansiysk_dep_culture,
            hasher.HashPassword("khmcul"),
            Municipalities.Khanty_mansiysk),

            Organization.Create(StructuredOrganizations.khanty_mansiysk_dep_education,
            hasher.HashPassword("khmedu"),
            Municipalities.Khanty_mansiysk),

            Organization.Create(StructuredOrganizations.khanty_mansiysk_dep_young,
            hasher.HashPassword("khmyou"),
            Municipalities.Khanty_mansiysk),

            Organization.Create(StructuredOrganizations.khanty_mansiysk_dep_sport,
            hasher.HashPassword("khmspo"),
            Municipalities.Khanty_mansiysk),





            Organization.Create(StructuredOrganizations.surgut_dep_culture,
            hasher.HashPassword("surcul"),
            Municipalities.Surgut),

            Organization.Create(StructuredOrganizations.surgut_dep_education,
            hasher.HashPassword("suredu"),
            Municipalities.Surgut),

            Organization.Create(StructuredOrganizations.surgut_dep_young,
            hasher.HashPassword("suryou"),
            Municipalities.Surgut),

            Organization.Create(StructuredOrganizations.surgut_dep_sport,
            hasher.HashPassword("surspo"),
            Municipalities.Surgut),





            Organization.Create(StructuredOrganizations.nefteyugansk_dep_culture,
            hasher.HashPassword("nefcul"),
            Municipalities.Nefteyugansk),

            Organization.Create(StructuredOrganizations.nefteyugansk_dep_education,
            hasher.HashPassword("nefedu"),
            Municipalities.Nefteyugansk),

            Organization.Create(StructuredOrganizations.nefteyugansk_dep_young,
            hasher.HashPassword("nefyou"),
            Municipalities.Nefteyugansk),

            Organization.Create(StructuredOrganizations.nefteyugansk_dep_sport,
            hasher.HashPassword("nefspo"),
            Municipalities.Nefteyugansk),
        ];
    }
}
