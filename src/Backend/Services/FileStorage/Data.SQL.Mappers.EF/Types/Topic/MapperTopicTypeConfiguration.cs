// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Topic;

/// <summary>
/// Конфигурация типа "Тема" сопоставителя.
/// </summary>
/// <typeparam name="TEntity">Тип сущности.</typeparam>
public class MapperTopicTypeConfiguration<TEntity> : MapperTypeConfiguration<TEntity>
    where TEntity : TopicTypeEntity
{
    #region Constructors

    /// <inheritdoc/>
    public MapperTopicTypeConfiguration(TypesOptions typesOptions)
        : base(typesOptions)
    {
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public override void Configure(EntityTypeBuilder<TEntity> builder)
    {
        var options = TypesOptions.Topic;

        if (options is null)
        {
            throw new NullVariableException<MapperTopicTypeConfiguration<TEntity>>(nameof(options));
        }

        builder.ToTable(options.DbTable, options.DbSchema);

        builder.HasKey(x => x.Id).HasName(options.DbPrimaryKey);

        builder.Property(x => x.RowGuid)
            .IsRequired()
            .HasColumnName(options.DbColumnForRowGuid);

        builder.Property(x => x.Id).HasColumnName(options.DbColumnForId);

        builder.Property(x => x.Name)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(options.DbMaxLengthForName)
            .HasColumnName(options.DbColumnForName);

        builder.Property(x => x.ParentId).HasColumnName(options.DbColumnForParentId);

        builder.HasIndex(x => x.RowGuid)
            .IsUnique()
            .HasDatabaseName(options.DbUniqueIndexForRowGuid);

        builder.HasIndex(x => new { x.Name, x.ParentId })
            .IsUnique()
            .HasDatabaseName(options.DbUniqueIndexForNameAndParentId);

        builder.HasIndex(x => x.ParentId).HasDatabaseName(options.DbIndexForParentId);
    }

    #endregion Public methods
}
