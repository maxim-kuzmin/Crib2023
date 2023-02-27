// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL;

/// <summary>
/// Инитерфейс ресурса.
/// </summary>
public interface IResource
{
    #region Methods

    /// <summary>
    /// Получить корректное значение свойства "Name".
    /// </summary>
    /// <returns>Корректное значение.</returns>
    string GetValidValueForName();

    /// <summary>
    /// Получить корректное значение свойства "ParentId".
    /// </summary>
    /// <returns>Корректное значение.</returns>
    string GetValidValueForParentId();

    /// <summary>
    /// Получить корректное значение свойства "Title".
    /// </summary>
    /// <returns>Корректное значение.</returns>
    string GetValidValueForTitle();

    /// <summary>
    /// Получить корректное значение свойства "TopicId".
    /// </summary>
    /// <returns>Корректное значение.</returns>
    string GetValidValueForTopicId();

    #endregion Methods
}
