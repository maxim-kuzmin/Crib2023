// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.List.Get;

/// <summary>
/// Отклик операции получения списка в домене "Тема".
/// </summary>
public class TopicDomainListGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public TopicDomainListGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public TopicDomainListGetOperationResponse(TopicDomainListGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
