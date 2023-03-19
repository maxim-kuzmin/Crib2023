// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class CatalogTopicDomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        CatalogTopicItemGetOperationInput,
        CatalogTopicItemGetOperationOutput,
        CatalogTopicItemGetOperationResult>,
    ICatalogTopicItemGetOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicDomainItemGetOperationHandler(
        ICatalogTopicDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogTopicDomainItemGetOperationHandler> logger,
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
