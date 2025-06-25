using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ATKApplication.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Added4DepartmentsToKhM : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Organizations",
                columns: new[] { "Id", "Municipality", "Name", "Password", "Rating" },
                values: new object[,]
                {
                    { new Guid("11de291a-6a3b-462b-9b5c-bfd231f9152b"), "Khanty_mansiysk", "khanty_mansiysk_dep_culture", "$2a$11$Kr7XF4EezWHdG4rASUuYEuGlA5q7gK1mbShnCYTDAEHJOszPF4gJ2", 0 },
                    { new Guid("44c63e81-9449-44be-bdf5-02a15e07df82"), "Khanty_mansiysk", "khanty_mansiysk_dep_education", "$2a$11$r7mx7JR27QNkNrFdIJC4MuXoRu0GFKZnt2S2tRww0vW3TSHx.QrrO", 0 },
                    { new Guid("4dbe5794-f0cb-4ff7-905a-ff1fe08cf3f9"), "Khanty_mansiysk", "khanty_mansiysk_dep_young", "$2a$11$yBSJO99d7pgOyRJl8ds5AeLFx2IboIr7L3.8Ns7kYbgWE.hbbkbJG", 0 },
                    { new Guid("61edd380-824b-4667-8268-754f9d438232"), "Khanty_mansiysk", "khanty_mansiysk_dep_sport", "$2a$11$Wj9iI5h4HnLQfDL.rWvsUujO56HaElkn56ujgUPykyvZhmMhJfWyS", 0 },
                    });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            
        }
    }
}
