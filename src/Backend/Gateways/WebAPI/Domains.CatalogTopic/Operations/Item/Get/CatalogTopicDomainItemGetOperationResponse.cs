﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;

/// <summary>
/// Отклик операции получения элемента в домене "Тема в каталоге".
/// </summary>
public class CatalogTopicDomainItemGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public CatalogTopicItemGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogTopicDomainItemGetOperationResponse(CatalogTopicItemGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
