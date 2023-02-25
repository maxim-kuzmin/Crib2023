// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.List.Get;

/// <summary>
/// Результат операции получения списка "Статья".
/// </summary>
public class ArticleListGetOperationResult : OperationResultWithOutput<ArticleListGetOperationOutput>
{
    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public ArticleListGetOperationResult(OperationResultWithOutput<ArticleListGetOperationOutput> operationResult)
    {
        IsOk = operationResult.IsOk;

        OperationCode = operationResult.OperationCode;

        Output = operationResult.Output;

        foreach (string errorMessage in operationResult.ErrorMessages)
        {
            ErrorMessages.Add(errorMessage);
        }
    }

    #endregion Constructors
}
