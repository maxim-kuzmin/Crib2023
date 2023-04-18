// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Save;

/// <summary>
/// Запрос операции сохранения элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemSaveOperationRequest : IRequest<CatalogArticleDomainItemSaveOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public CatalogArticleTypeEntity Input { get; }

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
    public CatalogArticleDomainItemSaveOperationRequest(
        CatalogArticleTypeEntity input,
        string operationCode = "")
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
