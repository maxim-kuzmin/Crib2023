// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Types.Article;

/// <summary>
/// Конфигурация типа "Статья" сопоставителя.
/// </summary>
/// <typeparam name="TEntity">Тип сущности.</typeparam>
public class MapperArticleTypeConfiguration<TEntity> : MapperTypeConfiguration<TEntity>
    where TEntity : ArticleTypeEntity
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
    public override void Configure(EntityTypeBuilder<TEntity> builder)
    {
        var options = TypesOptions.Article;

        if (options is null)
        {
            throw new NullVariableException<MapperArticleTypeConfiguration<TEntity>>(nameof(options));
        }

        builder.ToTable(options.DbTable, options.DbSchema);

        builder.HasKey(x => x.Id).HasName(options.DbPrimaryKey);

        builder.Property(x => x.RowGuid)
            .IsRequired()
            .HasColumnName(options.DbColumnForRowGuid);

        builder.Property(x => x.Body)
            .IsRequired()
            .IsUnicode()
            .HasColumnName(options.DbColumnForBody);

        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd()
            .HasColumnName(options.DbColumnForId);

        builder.Property(x => x.Title)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(options.DbMaxLengthForTitle)
            .HasColumnName(options.DbColumnForTitle);

        builder.Property(x => x.TopicId)
            .IsRequired()
            .HasColumnName(options.DbColumnForTopicId);

        builder.HasIndex(x => x.RowGuid)
            .IsUnique()
            .HasDatabaseName(options.DbUniqueIndexForRowGuid);

        builder.HasIndex(x => new { x.Title, x.TopicId })
            .IsUnique()
            .HasDatabaseName(options.DbUniqueIndexForTitleAndTopicId);

        builder.HasIndex(x => x.TopicId).HasDatabaseName(options.DbIndexForTopicId);
    }

    #endregion Public methods
}
