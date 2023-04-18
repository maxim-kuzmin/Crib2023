// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Delete;

/// <summary>
/// Отклик операции удаления элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemDeleteOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public CatalogArticleDomainItemDeleteOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public CatalogArticleDomainItemDeleteOperationResponse(
        CatalogArticleDomainItemDeleteOperationResult operationResult)
    {
        OperationResult = operationResult;
    }

    #endregion Constructors
}
