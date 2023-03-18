// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Entities;

/// <summary>
/// Сущность "Статья".
/// </summary>
public class ArticleEntity : ArticleBaseEntity<ArticleTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public ArticleEntity(ArticleTypeEntity? data = null) : base(data)
    {
    }

    #endregion Constructors
}
