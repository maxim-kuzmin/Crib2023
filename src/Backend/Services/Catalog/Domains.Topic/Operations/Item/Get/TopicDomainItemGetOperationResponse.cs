// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Item.Get;

/// <summary>
/// Отклик операции получения элемента в домене "Тема".
/// </summary>
public class TopicDomainItemGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public TopicDomainItemGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public TopicDomainItemGetOperationResponse(TopicDomainItemGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
