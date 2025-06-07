using ATKApplication.Contracts.Request;
using ATKApplication.Extensions;
using ATKApplication.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ATKApplication.Configurations
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

            builder.HasData(GetOrgs());
        }

        public List<Organization> GetOrgs() => [

            Organization.Create(AllMunicipalityOrganizations.atk_khmao,
            hasher.HashPassword("atk_khmao"),
            Municipalities.noMunicipality),

            Organization.Create(AllMunicipalityOrganizations.atk_beloyarskiy_rayon,
            hasher.HashPassword("atkbelray"),
            Municipalities.Beloyarskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_berezovskiy_rayon,
            hasher.HashPassword("atkberray"),
            Municipalities.Berezovskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_condinskiy_rayon,
            hasher.HashPassword("atkconray"),
            Municipalities.Condinskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_khanty_mansiysk,
            hasher.HashPassword("atkkhm"),
            Municipalities.Khanty_mansiysk),

            Organization.Create(AllMunicipalityOrganizations.atk_khanty_mansiyskiy_rayon,
            hasher.HashPassword("atkkhmray"),
            Municipalities.Khanty_mansiyskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_kogalym,
            hasher.HashPassword("atkkog"),
            Municipalities.Kogalym),

            Organization.Create(AllMunicipalityOrganizations.atk_langepas,
            hasher.HashPassword("atklan"),
            Municipalities.Langepas),

            Organization.Create(AllMunicipalityOrganizations.atk_megion,
            hasher.HashPassword("atkmeg"),
            Municipalities.Megion),


            Organization.Create(AllMunicipalityOrganizations.atk_nefteyugansk,
            hasher.HashPassword("atkneft"),
            Municipalities.Nefteyugansk),

            Organization.Create(AllMunicipalityOrganizations.atk_nefteyuganskiy_rayon,
            hasher.HashPassword("atkneftray"),
            Municipalities.Nefteyuganskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_nizhnevartovsk,
            hasher.HashPassword("atknizh"),
            Municipalities.Nizhnevartovsk),

            Organization.Create(AllMunicipalityOrganizations.atk_nizhnevartovskiy_rayon,
            hasher.HashPassword("atknizhray"),
            Municipalities.Nizhnevartovskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_nyagan,
            hasher.HashPassword("atknya"),
            Municipalities.Nyagan),

            Organization.Create(AllMunicipalityOrganizations.atk_oktyabrskiy_rayon,
            hasher.HashPassword("atkoktray"),
            Municipalities.Oktyabrskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_pokachi,
            hasher.HashPassword("atkpok"),
            Municipalities.Pokachi),

            Organization.Create(AllMunicipalityOrganizations.atk_pyth_yach,
            hasher.HashPassword("atkpyth"),
            Municipalities.Pyth_yach),

            Organization.Create(AllMunicipalityOrganizations.atk_raduzhnyi,
            hasher.HashPassword("atkrad"),
            Municipalities.Raduzhnyi),

            Organization.Create(AllMunicipalityOrganizations.atk_sovietskiy_rayon,
            hasher.HashPassword("atksovray"),
            Municipalities.Sovietskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_surgut,
            hasher.HashPassword("atksur"),
            Municipalities.Surgut),

            Organization.Create(AllMunicipalityOrganizations.atk_surgutskiy_rayon,
            hasher.HashPassword("atksurray"),
            Municipalities.Surgutskiy_rayon),

            Organization.Create(AllMunicipalityOrganizations.atk_urai,
            hasher.HashPassword("atkurai"),
            Municipalities.Urai),

            Organization.Create(AllMunicipalityOrganizations.atk_yugorsk,
            hasher.HashPassword("atkyug"),
            Municipalities.Yugorsk)
        ];
    }
}
