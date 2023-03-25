// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic;

/// <summary>
/// Интерфейс репозитория домена "Тема".
/// </summary>
public interface ITopicDomainRepository : IRepository<TopicDomainEntity>
{
    #region Methods

    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение элемента.</returns>
    Task<TopicDomainItemGetOperationOutput> GetItem(TopicDomainItemGetOperationInput input);

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение списка.</returns>
    Task<TopicDomainListGetOperationOutput> GetList(TopicDomainListGetOperationInput input);

    #endregion Methods
}
