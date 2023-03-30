// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Tree.Get;

/// <summary>
/// Отклик операции получения списка в домене "Тема в каталоге".
/// </summary>
public class CatalogTopicDomainTreeGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public CatalogTopicDomainTreeGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogTopicDomainTreeGetOperationResponse(CatalogTopicDomainTreeGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
