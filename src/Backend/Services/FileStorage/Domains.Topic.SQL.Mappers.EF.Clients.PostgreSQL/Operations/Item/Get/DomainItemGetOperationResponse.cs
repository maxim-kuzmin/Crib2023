// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Отклик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public OperationResultWithOutput<TopicItemGetOperationOutput> OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public DomainItemGetOperationResponse(
        OperationResultWithOutput<TopicItemGetOperationOutput> operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
