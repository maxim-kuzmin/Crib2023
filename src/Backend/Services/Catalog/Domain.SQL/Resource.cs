// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL;

/// <summary>
/// Ресурс.
/// </summary>
public class Resource : IResource
{
    #region Fields

    private readonly IStringLocalizer _localizer;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="localizer">Локализатор.</param>
    public Resource(IStringLocalizer<Resource> localizer)
    {
        _localizer = localizer;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public string GetValidValueForName()
    {
        return _localizer["@@ValidValueForName"];
    }

    /// <inheritdoc/>
    public string GetValidValueForParentId()
    {
        return _localizer["@@ValidValueForParentId"];
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
