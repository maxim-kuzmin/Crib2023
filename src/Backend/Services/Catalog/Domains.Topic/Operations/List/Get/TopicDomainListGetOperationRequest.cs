﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.List.Get;

/// <summary>
/// Запрос операции получения списка в домене.
/// </summary>
public class TopicDomainListGetOperationRequest : IRequest<TopicDomainListGetOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public TopicDomainListGetOperationInput Input { get; }

    /// <summary>
    /// Код операции.
    /// </summary>
    public string OperationCode { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    public TopicDomainListGetOperationRequest(TopicDomainListGetOperationInput input, string operationCode = "")
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
