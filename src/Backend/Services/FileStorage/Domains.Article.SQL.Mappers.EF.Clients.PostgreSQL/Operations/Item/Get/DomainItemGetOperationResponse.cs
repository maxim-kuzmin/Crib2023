﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Отклик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public ArticleItemGetOperationResult OperationResult { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public DomainItemGetOperationResponse(OperationResultWithOutput<ArticleItemGetOperationOutput> operationResult)
    {
        OperationResult = new(operationResult);
    }

    #endregion Constructors
}
