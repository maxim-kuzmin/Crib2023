// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic;

/// <summary>
/// Ресурс домена.
/// </summary>
public class CatalogTopicDomainResource : ICatalogTopicDomainResource
{
    #region Fields

    private readonly IStringLocalizer<CatalogTopicDomainResource> _localizer;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="localizer">Локализатор.</param>
    public CatalogTopicDomainResource(IStringLocalizer<CatalogTopicDomainResource> localizer)
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
    public string GetTreeGetOperationName()
    {
        return _localizer["@@TreeGetOperationName"];
    }

    #endregion Public methods
}
