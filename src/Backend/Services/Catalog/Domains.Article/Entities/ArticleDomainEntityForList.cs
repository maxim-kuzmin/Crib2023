// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Entities;

/// <summary>
/// Cущность для списка домена "Статья".
/// </summary>
public class ArticleDomainEntityForList : ArticleDomainEntity<ArticleTypeEntityForList>
{
    #region Constructors

    /// <inheritdoc/>
    public ArticleDomainEntityForList(ArticleTypeEntityForList? data = null) : base(data)
    {
    }

    #endregion Constructors
}

