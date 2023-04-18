// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Delete;

/// <summary>
/// Обработчик операции удаления элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemDeleteOperationHandler :
    OperationWithInputHandler<
        CatalogArticleItemGetOperationInput,
        CatalogArticleDomainItemDeleteOperationResult>,
    ICatalogArticleDomainItemDeleteOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleDomainItemDeleteOperationHandler(
        ICatalogArticleDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogArticleDomainItemDeleteOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetItemDeleteOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
    }

    #endregion Constructors
}
