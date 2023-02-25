// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;

/// <summary>
/// Отклик операции получения списка в домене.
/// </summary>
public class DomainListGetOperationResponse
{
    #region Properties

    /// <summary>
    /// Результат операции.
    /// </summary>
    public CatalogArticleListGetOperationResult OperationResult { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationResult">Результат операции.</param>
    public DomainListGetOperationResponse(
        OperationResultWithOutput<CatalogArticleListGetOperationOutput> operationResult)
    {
        OperationResult = new(operationResult);
    }

    #endregion Constructors
}
