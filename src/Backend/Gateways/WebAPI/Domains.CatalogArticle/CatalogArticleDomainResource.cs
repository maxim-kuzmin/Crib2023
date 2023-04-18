// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle;

/// <summary>
/// Ресурс домена.
/// </summary>
public class CatalogArticleDomainResource : ICatalogArticleDomainResource
{
    #region Properties

    private IStringLocalizer<CatalogArticleDomainResource> Localizer { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="localizer">Локализатор.</param>
    public CatalogArticleDomainResource(IStringLocalizer<CatalogArticleDomainResource> localizer)
    {
        Localizer = localizer;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public string GetItemDeleteOperationName()
    {
        return Localizer["@@ItemDeleteOperationName"];
    }

    /// <inheritdoc/>
    public string GetItemGetOperationName()
    {
        return Localizer["@@ItemGetOperationName"];
    }

    /// <inheritdoc/>
    public string GetItemSaveOperationName()
    {
        return Localizer["@@ItemSaveOperationName"];
    }

    /// <inheritdoc/>
    public string GetListGetOperationName()
    {
        return Localizer["@@ListGetOperationName"];
    }

    #endregion Public methods
}
