﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Repositories;

/// <summary>
/// Интерфейс репозитория "Статья".
/// </summary>
public interface IArticleDomainRepository : IRepository<ArticleDomainEntity>
{
    #region Methods

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

    #endregion Methods
}