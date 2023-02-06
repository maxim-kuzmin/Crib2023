// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;

/// <summary>
/// Запрос операции получения списка в домене.
/// </summary>
public class DomainListGetOperationRequest : IRequest<DomainListGetOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public ArticleItemGetOperationInput Input { get; init; }

    /// <summary>
    /// Код операции.
    /// </summary>
    public string? OperationCode { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="input">Входные данные.</param>
    /// <param name="operationCode">Код операции.</param>
    public DomainListGetOperationRequest(ArticleItemGetOperationInput input, string? operationCode = null)
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
