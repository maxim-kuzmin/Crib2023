// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Entities;

/// <summary>
/// Cущность для элемента домена "Статья".
/// </summary>
public class ArticleDomainEntityForItem : ArticleDomainEntity<ArticleTypeEntity>
{
    #region Constructors

    /// <inheritdoc/>
    public ArticleDomainEntityForItem(ArticleTypeEntity? data = null) : base(data)
    {
    }

    #endregion Constructors
}
