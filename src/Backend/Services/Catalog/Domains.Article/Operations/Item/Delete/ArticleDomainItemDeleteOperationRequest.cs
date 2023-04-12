// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Delete;

/// <summary>
/// Запрос операции удаления элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemDeleteOperationRequest : IRequest<ArticleDomainItemDeleteOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public ArticleDomainItemGetOperationInput Input { get; }

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
    public ArticleDomainItemDeleteOperationRequest(ArticleDomainItemGetOperationInput input, string operationCode = "")
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
