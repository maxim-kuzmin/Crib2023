// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Tree.Get;

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Tree.Get;

/// <summary>
/// Обработчик операции получения списка в домене "Тема в каталоге".
/// </summary>
public class CatalogTopicDomainTreeGetOperationHandler :
    OperationWithInputAndOutputHandler<
        CatalogTopicTreeGetOperationInput,
        CatalogTopicTreeGetOperationOutput,
        CatalogTopicDomainTreeGetOperationResult>,
    ICatalogTopicDomainTreeGetOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicDomainTreeGetOperationHandler(
        ICatalogTopicDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<CatalogTopicDomainTreeGetOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetTreeGetOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
    }

    #endregion Constructors
}
