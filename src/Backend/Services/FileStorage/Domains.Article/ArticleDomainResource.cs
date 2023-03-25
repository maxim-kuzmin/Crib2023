// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Ресурс домена.
/// </summary>
public class ArticleDomainResource : IArticleDomainResource
{
    #region Fields

    private readonly IStringLocalizer<ArticleDomainResource> _localizer;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="localizer">Локализатор.</param>
    public ArticleDomainResource(IStringLocalizer<ArticleDomainResource> localizer)
    {
        _localizer = localizer;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public string GetItemGetOperationName()
    {
        return _localizer["@@ItemGetOperationName"];
    }

    /// <inheritdoc/>
    public string GetListGetOperationName()
    {
        return _localizer["@@ListGetOperationName"];
    }

    /// <inheritdoc/>
    public string GetValidValueForTitle()
    {
        return _localizer["@@ValidValueForTitle"];
    }

    /// <inheritdoc/>
    public string GetValidValueForTopicId()
    {
        return _localizer["@@ValidValueForTopicId"];
    }

    #endregion Public methods
}
