// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL;

/// <summary>
/// Ресурс домена.
/// </summary>
public class DomainResource : IDomainResource
{
    #region Properties

    private IStringLocalizer<DomainResource> Localizer { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="localizer">Локализатор.</param>
    public DomainResource(IStringLocalizer<DomainResource> localizer)
    {
        Localizer = localizer;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public string GetItemGetOperationName()
    {
        return Localizer["@@ItemGetOperationName"];
    }

    /// <inheritdoc/>
    public string GetListGetOperationName()
    {
        return Localizer["@@ListGetOperationName"];
    }

    #endregion Public methods
}
