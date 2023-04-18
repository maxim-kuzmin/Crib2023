// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Save;

/// <summary>
/// Обработчик операции сохранения элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemSaveOperationHandler :
    OperationWithInputAndOutputHandler<
        CatalogArticleTypeEntity,
        CatalogArticleItemGetOperationOutput,
        CatalogArticleDomainItemGetOperationResult>,
    ICatalogArticleDomainItemSaveOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleDomainItemSaveOperationHandler(
        ICatalogArticleDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogArticleDomainItemSaveOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetItemSaveOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
    }

    #endregion Constructors
}
