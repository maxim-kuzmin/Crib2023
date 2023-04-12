// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article;

/// <summary>
/// Интерфейс репозитория домена "Статья".
/// </summary>
public interface IArticleDomainRepository : IRepository<ArticleDomainEntityForItem>
{
    #region Methods

    /// <summary>
    /// Удалить элемент.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на удаление элемента.</returns>
    Task DeleteItem(ArticleDomainItemGetOperationInput input);

    /// <summary>
    /// Получить элемент.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение элемента.</returns>
    Task<ArticleDomainItemGetOperationOutput> GetItem(ArticleDomainItemGetOperationInput input);

    /// <summary>
    /// Получить список.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <returns>Задача на получение списка.</returns>
    Task<ArticleDomainListGetOperationOutput> GetList(ArticleDomainListGetOperationInput input);

    /// <summary>
    /// Сохранить элемент.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Задача на получение элемента.</returns>
    Task<ArticleDomainItemGetOperationOutput> SaveItem(ArticleTypeEntity entity);

    #endregion Methods
}
