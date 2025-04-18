﻿// <auto-generated />
using System;
using ATKApplication.DataBase;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ATKApplication.Migrations
{
    [DbContext(typeof(DataBaseContext))]
    [Migration("20250401142044_UpdatedThemeConfiguration")]
    partial class UpdatedThemeConfiguration
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ATKApplication.Models.Category", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uuid");

                    b.Property<int?>("Migrants")
                        .HasColumnType("integer");

                    b.Property<int?>("NotWorkingYouth")
                        .HasColumnType("integer");

                    b.Property<int?>("Registrated")
                        .HasColumnType("integer");

                    b.Property<int?>("Schools")
                        .HasColumnType("integer");

                    b.Property<int?>("Students")
                        .HasColumnType("integer");

                    b.Property<int?>("WorkingYouth")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("ATKApplication.Models.Event", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CategoryId")
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("character varying(150)");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<string>("EqualToEqualDescription")
                        .HasColumnType("text");

                    b.Property<int>("EventType")
                        .HasColumnType("integer");

                    b.Property<Guid>("FinanceId")
                        .HasColumnType("uuid");

                    b.Property<bool>("IsBestPractice")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsSystematic")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsValuable")
                        .HasColumnType("boolean");

                    b.Property<int>("LevelType")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)");

                    b.Property<Guid>("OrganizerId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("ReportId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("ThemeId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("OrganizerId");

                    b.HasIndex("ReportId");

                    b.HasIndex("ThemeId");

                    b.ToTable("Events");
                });

            modelBuilder.Entity("ATKApplication.Models.FeedBack", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uuid");

                    b.Property<bool>("HasGuestionnaire")
                        .HasColumnType("boolean");

                    b.Property<bool>("HasInternet")
                        .HasColumnType("boolean");

                    b.Property<bool>("HasInterview")
                        .HasColumnType("boolean");

                    b.Property<bool>("HasOpros")
                        .HasColumnType("boolean");

                    b.Property<bool>("HasOther")
                        .HasColumnType("boolean");

                    b.HasKey("Id");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("FeedBacks");
                });

            modelBuilder.Entity("ATKApplication.Models.Finance", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uuid");

                    b.Property<int?>("GranteBudget")
                        .HasColumnType("integer");

                    b.Property<int?>("MunicipalBudget")
                        .HasColumnType("integer");

                    b.Property<int?>("OtherBudget")
                        .HasColumnType("integer");

                    b.Property<int?>("RegionalBudget")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("EventId")
                        .IsUnique();

                    b.ToTable("Finances");
                });

            modelBuilder.Entity("ATKApplication.Models.InterAgencyCooperation", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .HasColumnType("text");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uuid");

                    b.Property<string>("Organization")
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("InterAgencyCooperations");
                });

            modelBuilder.Entity("ATKApplication.Models.MediaLink", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("EventId");

                    b.ToTable("MediaLinks");
                });

            modelBuilder.Entity("ATKApplication.Models.Organization", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid?>("MunicipalityId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Rating")
                        .HasColumnType("integer");

                    b.Property<Guid>("RoleId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("MunicipalityId");

                    b.ToTable("Organizations");
                });

            modelBuilder.Entity("ATKApplication.Models.Plan", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("OrganizationId")
                        .HasColumnType("uuid");

                    b.Property<int>("Year")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrganizationId");

                    b.ToTable("Plans");
                });

            modelBuilder.Entity("ATKApplication.Models.Report", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created_At")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateOnly>("EndDate")
                        .HasColumnType("date");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("OrganizerId")
                        .HasColumnType("uuid");

                    b.Property<DateOnly>("StartDate")
                        .HasColumnType("date");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("OrganizerId");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("ATKApplication.Models.ReportAndEvent", b =>
                {
                    b.Property<Guid>("ReportId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("EventId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("Created_At")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("ReportId", "EventId");

                    b.HasIndex("EventId");

                    b.ToTable("ReportAndEvents");
                });

            modelBuilder.Entity("ATKApplication.Models.Theme", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Code")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Themes");

                    b.HasData(
                        new
                        {
                            Id = new Guid("0890e272-8dcd-4d2e-b8fb-d64f8e9387dd"),
                            Code = "5.9",
                            Description = "«Анализ эффективности реализации общепрофилактических, адресных, индивидуальных и информационно-пропагандистских мероприятий с учетом результатов проводимых социальных исследований, мониторингов общественно-политических процессов и информационных интересов населения, прежде всего молодежи»"
                        });
                });

            modelBuilder.Entity("ATKApplication.Models.Category", b =>
                {
                    b.HasOne("ATKApplication.Models.Event", "Event")
                        .WithOne("Category")
                        .HasForeignKey("ATKApplication.Models.Category", "EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("ATKApplication.Models.Event", b =>
                {
                    b.HasOne("ATKApplication.Models.Organization", "Organizer")
                        .WithMany("Events")
                        .HasForeignKey("OrganizerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ATKApplication.Models.Report", null)
                        .WithMany("Events")
                        .HasForeignKey("ReportId");

                    b.HasOne("ATKApplication.Models.Theme", "Theme")
                        .WithMany("Events")
                        .HasForeignKey("ThemeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organizer");

                    b.Navigation("Theme");
                });

            modelBuilder.Entity("ATKApplication.Models.FeedBack", b =>
                {
                    b.HasOne("ATKApplication.Models.Event", "Event")
                        .WithOne("FeedBack")
                        .HasForeignKey("ATKApplication.Models.FeedBack", "EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("ATKApplication.Models.Finance", b =>
                {
                    b.HasOne("ATKApplication.Models.Event", "Event")
                        .WithOne("Finance")
                        .HasForeignKey("ATKApplication.Models.Finance", "EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("ATKApplication.Models.InterAgencyCooperation", b =>
                {
                    b.HasOne("ATKApplication.Models.Event", "Event")
                        .WithMany("InterAgencyCooperations")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("ATKApplication.Models.MediaLink", b =>
                {
                    b.HasOne("ATKApplication.Models.Event", "Event")
                        .WithMany("MediaLinks")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");
                });

            modelBuilder.Entity("ATKApplication.Models.Organization", b =>
                {
                    b.HasOne("ATKApplication.Models.Organization", "Municipality")
                        .WithMany()
                        .HasForeignKey("MunicipalityId");

                    b.Navigation("Municipality");
                });

            modelBuilder.Entity("ATKApplication.Models.Plan", b =>
                {
                    b.HasOne("ATKApplication.Models.Organization", "Organization")
                        .WithMany()
                        .HasForeignKey("OrganizationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organization");
                });

            modelBuilder.Entity("ATKApplication.Models.Report", b =>
                {
                    b.HasOne("ATKApplication.Models.Organization", "Organizer")
                        .WithMany()
                        .HasForeignKey("OrganizerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organizer");
                });

            modelBuilder.Entity("ATKApplication.Models.ReportAndEvent", b =>
                {
                    b.HasOne("ATKApplication.Models.Event", "Event")
                        .WithMany("ReportAndEvents")
                        .HasForeignKey("EventId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ATKApplication.Models.Report", "Report")
                        .WithMany()
                        .HasForeignKey("ReportId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Event");

                    b.Navigation("Report");
                });

            modelBuilder.Entity("ATKApplication.Models.Event", b =>
                {
                    b.Navigation("Category");

                    b.Navigation("FeedBack");

                    b.Navigation("Finance");

                    b.Navigation("InterAgencyCooperations");

                    b.Navigation("MediaLinks");

                    b.Navigation("ReportAndEvents");
                });

            modelBuilder.Entity("ATKApplication.Models.Organization", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("ATKApplication.Models.Report", b =>
                {
                    b.Navigation("Events");
                });

            modelBuilder.Entity("ATKApplication.Models.Theme", b =>
                {
                    b.Navigation("Events");
                });
#pragma warning restore 612, 618
        }
    }
}
