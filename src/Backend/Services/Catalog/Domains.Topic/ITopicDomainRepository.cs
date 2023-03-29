// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

namespace Crib2023.Backend.Services.Catalog.Domains.Topic;

/// <summary>
/// Интерфейс репозитория домена "Тема".
/// </summary>
public interface ITopicDomainRepository : IRepository<TopicDomainEntityForItem>
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

    /// <summary>
    /// Получить дерево.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение дерева.</returns>
    Task<TopicDomainTreeGetOperationOutput> GetTree(TopicDomainTreeGetOperationInput input);

    #endregion Methods
}
