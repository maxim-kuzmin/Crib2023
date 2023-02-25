// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<CatalogTopicItemGetOperationInput, CatalogTopicItemGetOperationOutput>,
    ICatalogTopicItemGetOperationHandler
{
    #region Constructors

    /// <inheritdoc/>
    public DomainItemGetOperationHandler(
        IDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<DomainItemGetOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetItemGetOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
    }

    #endregion Constructors

    #region Private methods

    private CatalogTopicItemGetOperationInput TransformOperationInput(CatalogTopicItemGetOperationInput input)
    {
        input ??= new();

        return input;
    }

    private CatalogTopicItemGetOperationOutput TransformOperationOutput(CatalogTopicItemGetOperationOutput output)
    {
        output.Item ??= new();

        return output;
    }

    #endregion Private methods
}
