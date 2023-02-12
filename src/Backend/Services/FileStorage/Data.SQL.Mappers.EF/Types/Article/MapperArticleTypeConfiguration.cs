// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Article;

/// <summary>
/// Конфигурация типа "Статья" сопоставителя.
/// </summary>
/// <typeparam name="TArticleTypeEntity">Тип сущности типа "Статья".</typeparam>
public class MapperArticleTypeConfiguration<TArticleTypeEntity> :
    MapperTypeConfiguration<TArticleTypeEntity>
    where TArticleTypeEntity : ArticleTypeEntity
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
    public override void Configure(EntityTypeBuilder<TArticleTypeEntity> builder)
    {
        var options = TypesOptions.Article;

        if (options is null)
        {
            throw new NullVariableException<MapperArticleTypeConfiguration<TArticleTypeEntity>>(nameof(options));
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
    }

    #endregion Public methods
}
