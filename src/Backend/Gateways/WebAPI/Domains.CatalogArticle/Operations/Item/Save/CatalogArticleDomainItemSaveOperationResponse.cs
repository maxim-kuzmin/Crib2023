// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Save;

/// <summary>
/// Отклик операции сохранения элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemSaveOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public CatalogArticleDomainItemGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogArticleDomainItemSaveOperationResponse(CatalogArticleDomainItemGetOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
