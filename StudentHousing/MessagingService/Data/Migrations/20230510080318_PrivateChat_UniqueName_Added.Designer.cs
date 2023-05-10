﻿// <auto-generated />
using System;
using MessagingService.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace MessagingService.Data.Migrations
{
    [DbContext(typeof(MessageDbContext))]
    [Migration("20230510080318_PrivateChat_UniqueName_Added")]
    partial class PrivateChat_UniqueName_Added
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.5")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("MessagingService.Models.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasMaxLength(1000)
                        .HasColumnType("nvarchar")
                        .HasColumnName("content");

                    b.Property<int>("PrivateChatId")
                        .HasColumnType("int")
                        .HasColumnName("privateChatId");

                    b.Property<int>("SenderId")
                        .HasColumnType("int")
                        .HasColumnName("senderId");

                    b.Property<DateTime>("TimeStamp")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime2")
                        .HasDefaultValue(new DateTime(2023, 5, 10, 10, 3, 18, 622, DateTimeKind.Local).AddTicks(3274))
                        .HasColumnName("timeStamp");

                    b.HasKey("Id");

                    b.HasIndex("PrivateChatId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("MessagingService.Models.PrivateChat", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("UniqueName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar")
                        .HasColumnName("uniqueName");

                    b.Property<int>("User1Id")
                        .HasColumnType("int")
                        .HasColumnName("user1Id");

                    b.Property<int>("User2Id")
                        .HasColumnType("int")
                        .HasColumnName("user2Id");

                    b.HasKey("Id");

                    b.ToTable("PrivateChats");
                });

            modelBuilder.Entity("MessagingService.Models.Message", b =>
                {
                    b.HasOne("MessagingService.Models.PrivateChat", "PrivateChat")
                        .WithMany("Messages")
                        .HasForeignKey("PrivateChatId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("FK_Message_PrivateChat");

                    b.Navigation("PrivateChat");
                });

            modelBuilder.Entity("MessagingService.Models.PrivateChat", b =>
                {
                    b.Navigation("Messages");
                });
#pragma warning restore 612, 618
        }
    }
}