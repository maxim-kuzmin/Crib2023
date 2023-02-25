// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Topic.List.Get;

/// <summary>
/// Результат операции получения списка "Тема".
/// </summary>
public class TopicListGetOperationResult : OperationResultWithOutput<TopicListGetOperationOutput>
{
    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public TopicListGetOperationResult(OperationResultWithOutput<TopicListGetOperationOutput> operationResult)
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
