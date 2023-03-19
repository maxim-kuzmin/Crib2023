// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class CatalogArticleDomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        CatalogArticleItemGetOperationInput,
        CatalogArticleItemGetOperationOutput,
        CatalogArticleItemGetOperationResult>,
    ICatalogArticleItemGetOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleDomainItemGetOperationHandler(
        ICatalogArticleDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogArticleDomainItemGetOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetItemGetOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
    }

    #endregion Constructors
}
