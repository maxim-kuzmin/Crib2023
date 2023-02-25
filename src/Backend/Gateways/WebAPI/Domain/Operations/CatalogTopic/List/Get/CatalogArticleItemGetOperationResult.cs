// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.List.Get;

/// <summary>
/// Результат операции получения списка "Тема в каталоге".
/// </summary>
public class CatalogTopicListGetOperationResult : OperationResultWithOutput<CatalogTopicListGetOperationOutput>
{
    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogTopicListGetOperationResult(
        OperationResultWithOutput<CatalogTopicListGetOperationOutput> operationResult)
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