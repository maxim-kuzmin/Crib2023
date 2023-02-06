// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Types.Article;

/// <summary>
/// Конфигурация типа "Статья" сопоставителя.
/// </summary>
public class MapperArticleTypeConfiguration : MapperTypeConfiguration<MapperArticleTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public MapperArticleTypeConfiguration(TypesOptions typesOptions)
        : base(typesOptions)
    {
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Configure(EntityTypeBuilder<MapperArticleTypeEntity> builder)
    {
        var options = TypesOptions.Article;

        if (options is null)
        {
            throw new NullVariableException<MapperArticleTypeConfiguration>(nameof(options));
        }

        builder.ToTable(options.DbTable, options.DbSchema);

        builder.HasKey(x => x.Id).HasName(options.DbPrimaryKey);

        builder.Property(x => x.Hash)
            .IsRequired()
            .IsUnicode()
            .HasColumnName(options.DbColumnForHash);

        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd()
            .HasColumnName(options.DbColumnForId);

        builder.Property(x => x.Path)
            .IsRequired()
            .IsUnicode()
            .HasColumnName(options.DbColumnForPath);

        builder.Property(x => x.Title)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(options.DbMaxLengthForTitle)
            .HasColumnName(options.DbColumnForTitle);

        builder.Property(x => x.TopicId)
            .IsRequired()
            .HasColumnName(options.DbColumnForTopicId);
        
        builder.HasIndex(x => x.Title).IsUnique().HasDatabaseName(options.DbUniqueIndexForTitle);
        builder.HasIndex(x => x.TopicId).HasDatabaseName(options.DbIndexForTopicId);

        builder.HasOne(x => x.Topic)
            .WithMany(x => x.ArticleList)
            .HasForeignKey(x => x.TopicId)
            .HasConstraintName(options.DbForeignKeyToTopic);
    }

    #endregion Public methods
}
