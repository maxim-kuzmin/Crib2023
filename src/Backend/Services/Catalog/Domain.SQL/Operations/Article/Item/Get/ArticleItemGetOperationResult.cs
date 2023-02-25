// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.Item.Get;

/// <summary>
/// Результат операции получения элемента "Статья".
/// </summary>
public class ArticleItemGetOperationResult : OperationResultWithOutput<ArticleItemGetOperationOutput>
{
    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Репзультат операции.</param>
    public ArticleItemGetOperationResult(OperationResultWithOutput<ArticleItemGetOperationOutput> operationResult)
    {
        IsOk = operationResult.IsOk;

        OperationCode = operationResult.OperationCode;

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            ErrorMessages.Add(errorMessage);
        }
    }

    #endregion Constructors
}
