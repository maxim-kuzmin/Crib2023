// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic;

/// <summary>
/// Ресурс домена "Тема".
/// </summary>
public class TopicDomainResource : ITopicDomainResource
{
    #region Fields

    private readonly IStringLocalizer<TopicDomainResource> _localizer;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="localizer">Локализатор.</param>
    public TopicDomainResource(IStringLocalizer<TopicDomainResource> localizer)
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

    #endregion Public methods
}
