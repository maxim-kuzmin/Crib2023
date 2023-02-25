// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

/// <summary>
/// Отклик операции получения списка в домене.
/// </summary>
public class DomainListGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public TopicListGetOperationResult OperationResult { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public DomainListGetOperationResponse(OperationResultWithOutput<TopicListGetOperationOutput> operationResult)
    {
        OperationResult = new(operationResult);
    }

    #endregion Constructors
}
