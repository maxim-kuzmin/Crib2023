// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Отклик операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public TopicDomainTreeGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public TopicDomainTreeGetOperationResponse(TopicDomainTreeGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
