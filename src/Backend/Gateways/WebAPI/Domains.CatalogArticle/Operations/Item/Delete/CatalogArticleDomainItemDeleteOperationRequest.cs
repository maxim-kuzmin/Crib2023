// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Delete;

/// <summary>
/// Запрос операции удаления элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemDeleteOperationRequest : IRequest<CatalogArticleDomainItemDeleteOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public CatalogArticleItemGetOperationInput Input { get; }

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
    public CatalogArticleDomainItemDeleteOperationRequest(
        CatalogArticleItemGetOperationInput input,
        string operationCode = "")
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
