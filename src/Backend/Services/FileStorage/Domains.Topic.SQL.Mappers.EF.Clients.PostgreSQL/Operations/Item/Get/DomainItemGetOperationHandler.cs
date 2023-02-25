// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<TopicItemGetOperationInput, TopicItemGetOperationOutput>,
    ITopicItemGetOperationHandler
{
    #region Fields

    private readonly IDomainResource _domainResource;

    #endregion Fields

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
        _domainResource = domainResource;
        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
    }

    #endregion Constructors

    #region Private methods

    private TopicItemGetOperationInput TransformOperationInput(TopicItemGetOperationInput input)
    {
        input ??= new();

        input.Normalize();

        var invalidProperties = input.GetInvalidProperties();

        if (invalidProperties.Any())
        {
            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(invalidProperties));
        }

        return input;
    }

    private TopicItemGetOperationOutput TransformOperationOutput(TopicItemGetOperationOutput output)
    {
        output.Item ??= new();

        if (output.IsItemNotFound)
        {
            throw new LocalizedException(_domainResource.GetErrorMessageForEntityNotFound());
        }

        return output;
    }

    #endregion Private methods
}
