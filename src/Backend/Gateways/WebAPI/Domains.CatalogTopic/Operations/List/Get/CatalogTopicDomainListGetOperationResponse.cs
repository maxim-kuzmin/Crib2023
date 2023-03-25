// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get;

/// <summary>
/// Отклик операции получения списка в домене.
/// </summary>
public class CatalogTopicDomainListGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public CatalogTopicDomainListGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogTopicDomainListGetOperationResponse(CatalogTopicDomainListGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
