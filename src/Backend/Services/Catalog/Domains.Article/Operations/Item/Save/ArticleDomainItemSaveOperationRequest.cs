// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Save;

/// <summary>
/// Запрос операции сохранения элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemSaveOperationRequest : IRequest<ArticleDomainItemSaveOperationResponse>
{
    #region Properties

    /// <summary>
    /// Входные данные.
    /// </summary>
    public ArticleTypeEntity Input { get; }

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
    public ArticleDomainItemSaveOperationRequest(ArticleTypeEntity input, string operationCode = "")
    {
        Input = input;
        OperationCode = operationCode;
    }

    #endregion Constructors
}
