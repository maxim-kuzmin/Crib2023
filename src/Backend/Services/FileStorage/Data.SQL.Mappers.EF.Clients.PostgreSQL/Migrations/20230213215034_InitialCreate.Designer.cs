﻿// <auto-generated />
using System;
using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Migrations
{
    [DbContext(typeof(ClientMapperDbContext))]
    [Migration("20230213215034_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.HasPostgresExtension(modelBuilder, "ltree");
            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.HasSequence("topic_id_seq", "public");

            modelBuilder.Entity("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article.ClientMapperArticleTypeEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<long>("Id"));

                    b.Property<string>("Hash")
                        .IsRequired()
                        .IsUnicode(true)
                        .HasColumnType("text")
                        .HasColumnName("hash");

                    b.Property<string>("Path")
                        .IsRequired()
                        .IsUnicode(true)
                        .HasColumnType("text")
                        .HasColumnName("path");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(256)
                        .IsUnicode(true)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("title");

                    b.Property<long>("TopicId")
                        .HasColumnType("bigint")
                        .HasColumnName("topic_id");

                    b.HasKey("Id")
                        .HasName("pk_article");

                    b.HasIndex("TopicId")
                        .HasDatabaseName("ix_article_topic_id");

                    b.HasIndex("Title", "TopicId")
                        .IsUnique()
                        .HasDatabaseName("ux_article_title_topic_id");

                    b.ToTable("article", "public");
                });

            modelBuilder.Entity("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic.ClientMapperTopicTypeEntity", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseHiLo(b.Property<long>("Id"), "topic_id_seq", "public");

                    b.Property<string>("DbColumnForTreePath")
                        .IsRequired()
                        .HasColumnType("ltree")
                        .HasColumnName("tree_path");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(256)
                        .IsUnicode(true)
                        .HasColumnType("character varying(256)")
                        .HasColumnName("name");

                    b.Property<long?>("ParentId")
                        .HasColumnType("bigint")
                        .HasColumnName("parent_id");

                    b.HasKey("Id")
                        .HasName("pk_topic");

                    b.HasIndex("DbColumnForTreePath")
                        .HasDatabaseName("ix_topic_tree_path");

                    NpgsqlIndexBuilderExtensions.HasMethod(b.HasIndex("DbColumnForTreePath"), "gist");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("ix_topic_parent_id");

                    b.HasIndex("Name", "ParentId")
                        .IsUnique()
                        .HasDatabaseName("ux_topic_name_parent_id");

                    b.ToTable("topic", "public");
                });

            modelBuilder.Entity("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article.ClientMapperArticleTypeEntity", b =>
                {
                    b.HasOne("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic.ClientMapperTopicTypeEntity", "Topic")
                        .WithMany("ArticleList")
                        .HasForeignKey("TopicId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_article_topic");

                    b.Navigation("Topic");
                });

            modelBuilder.Entity("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic.ClientMapperTopicTypeEntity", b =>
                {
                    b.HasOne("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic.ClientMapperTopicTypeEntity", "TopicParent")
                        .WithMany("TopicChildList")
                        .HasForeignKey("ParentId")
                        .HasConstraintName("fk_topic_topic_parent_id");

                    b.Navigation("TopicParent");
                });

            modelBuilder.Entity("Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic.ClientMapperTopicTypeEntity", b =>
                {
                    b.Navigation("ArticleList");

                    b.Navigation("TopicChildList");
                });
#pragma warning restore 612, 618
        }
    }
}