// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic;

/// <summary>
/// Конфигурация типа "Тема" сопоставителя клиента.
/// </summary>
public class ClientMapperTopicTypeConfiguration : MapperTopicTypeConfiguration<ClientMapperTopicTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public ClientMapperTopicTypeConfiguration(TypesOptions typesOptions)
        : base(typesOptions)
    {
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Configure(EntityTypeBuilder<ClientMapperTopicTypeEntity> builder)
    {
        base.Configure(builder);

        var options = TypesOptions.Topic;

        builder.Property(x => x.ClientTreePath)
            .HasColumnName(options.DbColumnForTreePath);


        builder.HasOne(x => x.TopicParent)
            .WithMany(x => x.TopicChildList)
            .HasForeignKey(x => x.ParentId)
            .HasConstraintName(options.DbForeignKeyToTopicParent);
    }

    #endregion Public methods
}
