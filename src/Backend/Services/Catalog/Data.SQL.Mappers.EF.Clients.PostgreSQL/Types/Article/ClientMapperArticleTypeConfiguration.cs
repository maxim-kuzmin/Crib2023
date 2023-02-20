// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;

/// <summary>
/// Конфигурация типа "Статья" сопоставителя клиента.
/// </summary>
public class ClientMapperArticleTypeConfiguration : MapperArticleTypeConfiguration<ClientMapperArticleTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public ClientMapperArticleTypeConfiguration(TypesOptions typesOptions)
        : base(typesOptions)
    {
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Configure(EntityTypeBuilder<ClientMapperArticleTypeEntity> builder)
    {
        base.Configure(builder);

        var options = TypesOptions.Article;

        builder.Property(x => x.RowGuid).HasDefaultValueSql("gen_random_uuid()");

        builder.HasOne(x => x.Topic)
            .WithMany(x => x.ArticleList)
            .HasForeignKey(x => x.TopicId)
            .HasConstraintName(options.DbForeignKeyToTopic);
    }

    #endregion Public methods
}
