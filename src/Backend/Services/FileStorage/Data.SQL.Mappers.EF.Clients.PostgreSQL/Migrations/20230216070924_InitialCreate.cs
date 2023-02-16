using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "public");

            migrationBuilder.AlterDatabase()
                .Annotation("Npgsql:PostgresExtension:ltree", ",,");

            migrationBuilder.CreateSequence(
                name: "topic_id_seq",
                schema: "public");

            migrationBuilder.CreateTable(
                name: "topic",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false),
                    treepath = table.Column<string>(name: "tree_path", type: "ltree", nullable: false),
                    rowguid = table.Column<Guid>(name: "row_guid", type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    name = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    parentid = table.Column<long>(name: "parent_id", type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_topic", x => x.id);
                    table.ForeignKey(
                        name: "fk_topic_topic_parent_id",
                        column: x => x.parentid,
                        principalSchema: "public",
                        principalTable: "topic",
                        principalColumn: "id");
                });

            migrationBuilder.CreateTable(
                name: "article",
                schema: "public",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    rowguid = table.Column<Guid>(name: "row_guid", type: "uuid", nullable: false, defaultValueSql: "gen_random_uuid()"),
                    hash = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    path = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    title = table.Column<string>(type: "character varying(256)", maxLength: 256, nullable: false),
                    topicid = table.Column<long>(name: "topic_id", type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_article", x => x.id);
                    table.ForeignKey(
                        name: "fk_article_topic",
                        column: x => x.topicid,
                        principalSchema: "public",
                        principalTable: "topic",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "ix_article_topic_id",
                schema: "public",
                table: "article",
                column: "topic_id");

            migrationBuilder.CreateIndex(
                name: "ux_article_row_guid",
                schema: "public",
                table: "article",
                column: "row_guid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_article_title_topic_id",
                schema: "public",
                table: "article",
                columns: new[] { "title", "topic_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ix_topic_parent_id",
                schema: "public",
                table: "topic",
                column: "parent_id");

            migrationBuilder.CreateIndex(
                name: "ix_topic_tree_path",
                schema: "public",
                table: "topic",
                column: "tree_path")
                .Annotation("Npgsql:IndexMethod", "gist");

            migrationBuilder.CreateIndex(
                name: "ux_topic_name_parent_id",
                schema: "public",
                table: "topic",
                columns: new[] { "name", "parent_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "ux_topic_row_guid",
                schema: "public",
                table: "topic",
                column: "row_guid",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "article",
                schema: "public");

            migrationBuilder.DropTable(
                name: "topic",
                schema: "public");

            migrationBuilder.DropSequence(
                name: "topic_id_seq",
                schema: "public");
        }
    }
}
