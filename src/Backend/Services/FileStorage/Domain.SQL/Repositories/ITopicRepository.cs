// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Repositories;

/// <summary>
/// Интерфейс репозитория "Тема".
/// </summary>
public interface ITopicRepository : IRepository<TopicEntity>
{
    #region Methods

    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение элемента.</returns>
    Task<TopicItemGetOperationOutput> GetItem(TopicItemGetOperationInput input);

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение списка.</returns>
    Task<TopicListGetOperationOutput> GetList(TopicListGetOperationInput input);

    #endregion Methods
}
