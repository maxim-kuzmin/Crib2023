// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get;

/// <summary>
/// Обработчик операции получения списка в домене.
/// </summary>
public class CatalogTopicDomainListGetOperationHandler :
    OperationWithInputAndOutputHandler<
        CatalogTopicListGetOperationInput,
        CatalogTopicListGetOperationOutput,
        CatalogTopicListGetOperationResult>,
    ICatalogTopicListGetOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicDomainListGetOperationHandler(
        ICatalogTopicDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogTopicDomainListGetOperationHandler> logger,
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
