// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Delete;

/// <summary>
/// Отклик операции удаления элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemDeleteOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public ArticleDomainItemDeleteOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public ArticleDomainItemDeleteOperationResponse(ArticleDomainItemDeleteOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
