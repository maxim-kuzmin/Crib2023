// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Entities;

/// <summary>
/// Сущность "Статья для списка".
/// </summary>
public class ArticleEntityForList : ArticleBaseEntity<ArticleTypeEntityForList>
{
    #region Constructors

    /// <inheritdoc/>
    public ArticleEntityForList(ArticleTypeEntityForList? data = null) : base(data)
    {
    }

    #endregion Constructors
}

