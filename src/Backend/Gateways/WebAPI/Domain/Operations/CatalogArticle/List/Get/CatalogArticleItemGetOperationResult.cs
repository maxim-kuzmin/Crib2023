// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.List.Get;

/// <summary>
/// Результат операции получения списка "Статья в каталоге".
/// </summary>
public class CatalogArticleListGetOperationResult : OperationResultWithOutput<CatalogArticleListGetOperationOutput>
{
    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogArticleListGetOperationResult(
        OperationResultWithOutput<CatalogArticleListGetOperationOutput> operationResult)
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