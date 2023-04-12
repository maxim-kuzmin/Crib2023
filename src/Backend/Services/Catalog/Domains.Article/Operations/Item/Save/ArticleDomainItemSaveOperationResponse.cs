// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Save;

/// <summary>
/// Отклик операции сохранения элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemSaveOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public ArticleDomainItemSaveOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public ArticleDomainItemSaveOperationResponse(ArticleDomainItemSaveOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
