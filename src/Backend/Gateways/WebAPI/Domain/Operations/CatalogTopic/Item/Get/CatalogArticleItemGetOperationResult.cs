// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Item.Get;

/// <summary>
/// Результат операции получения элемента "Тема в каталоге".
/// </summary>
public class CatalogTopicItemGetOperationResult : OperationResultWithOutput<CatalogTopicItemGetOperationOutput>
{
    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Репзультат операции.</param>
    public CatalogTopicItemGetOperationResult(
        OperationResultWithOutput<CatalogTopicItemGetOperationOutput> operationResult)
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
