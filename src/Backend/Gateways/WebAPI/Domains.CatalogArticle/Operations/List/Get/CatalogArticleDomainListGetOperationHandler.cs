// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;

/// <summary>
/// Обработчик операции получения списка в домене.
/// </summary>
public class CatalogArticleDomainListGetOperationHandler :
    OperationWithInputAndOutputHandler<
        CatalogArticleListGetOperationInput,
        CatalogArticleListGetOperationOutput,
        CatalogArticleDomainListGetOperationResult>,
    ICatalogArticleDomainListGetOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleDomainListGetOperationHandler(
        ICatalogArticleDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogArticleDomainListGetOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetListGetOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
    }

    #endregion Constructors
}
