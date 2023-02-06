// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Topic;

/// <summary>
/// Конфигурация типа "Тема" сопоставителя.
/// </summary>
public class MapperTopicTypeConfiguration : MapperTypeConfiguration<MapperTopicTypeEntity>
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
    public sealed override void Configure(EntityTypeBuilder<MapperTopicTypeEntity> builder)
    {
        var options = TypesOptions.Topic;

        if (options is null)
        {
            throw new NullVariableException<MapperTopicTypeConfiguration>(nameof(options));
        }

        builder.ToTable(options.DbTable, options.DbSchema);

        builder.HasKey(x => x.Id).HasName(options.DbPrimaryKey);

        builder.Property(x => x.Id)
            .ValueGeneratedOnAdd()
            .HasColumnName(options.DbColumnForId);

        builder.Property(x => x.Name)
            .IsRequired()
            .IsUnicode()
            .HasMaxLength(options.DbMaxLengthForName)
            .HasColumnName(options.DbColumnForName);

        builder.Property(x => x.ParentId)
            .HasColumnName(options.DbColumnForParentId);

        builder.Property(x => x.TreeChildCount)
            .IsRequired()
            .HasDefaultValue(0)
            .HasColumnName(options.DbColumnForTreeChildCount);

        builder.Property(x => x.TreeDescendantCount)
            .IsRequired()
            .HasDefaultValue(0)
            .HasColumnName(options.DbColumnForTreeDescendantCount);

        builder.Property(x => x.TreeLevel)
            .IsRequired()
            .HasDefaultValue(0)
            .HasColumnName(options.DbColumnForTreeLevel);

        builder.Property(x => x.TreePath)
            .IsRequired()
            .IsUnicode(false)
            .HasMaxLength(options.DbMaxLengthForTreePath)
            .HasDefaultValue(string.Empty)
            .HasColumnName(options.DbColumnForTreePath);

        builder.Property(x => x.TreePosition)
            .IsRequired()
            .HasDefaultValue(0)
            .HasColumnName(options.DbColumnForTreePosition);

        builder.Property(x => x.TreeSort)
            .IsRequired()
            .IsUnicode(false)
            .HasMaxLength(options.DbMaxLengthForTreeSort)
            .HasDefaultValue(string.Empty)
            .HasColumnName(options.DbColumnForTreeSort);

        builder.HasIndex(x => x.Name).HasDatabaseName(options.DbIndexForName);
        builder.HasIndex(x => x.ParentId).HasDatabaseName(options.DbIndexForParentId);
        builder.HasIndex(x => x.TreeSort).HasDatabaseName(options.DbIndexForTreeSort);

        builder.HasIndex(x => new { x.ParentId, x.Name })
            .IsUnique()
            .HasDatabaseName(options.DbUniqueIndexForParentIdAndName);

        builder.HasOne(x => x.TopicParent)
            .WithMany(x => x.TopicChildList)
            .HasForeignKey(x => x.ParentId)
            .HasConstraintName(options.DbForeignKeyToTopicParent);
    }

    #endregion Public methods
}
