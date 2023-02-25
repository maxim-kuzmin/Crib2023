// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;

/// <summary>
/// Запрос операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationRequest : IRequest<DomainItemGetOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public CatalogTopicItemGetOperationInput Input { get; init; }

    /// <summary>
    /// Код операции.
    /// </summary>
    public string OperationCode { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    public DomainItemGetOperationRequest(CatalogTopicItemGetOperationInput input, string operationCode = "")
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
