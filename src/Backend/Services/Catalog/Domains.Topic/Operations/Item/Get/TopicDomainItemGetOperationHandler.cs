// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Core.Operations;

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class TopicDomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        TopicItemGetOperationInput,
        TopicItemGetOperationOutput,
        TopicItemGetOperationResult>,
    ITopicItemGetOperationHandler
{
    #region Fields

    private readonly IOperationsResource _operationsResource;

    private readonly IResourceOfServiceDomainSQL _resourceOfServiceDomainSQL;

    #endregion Fields

    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    private OperationInputInvalidProperties InvalidInputProperties { get; set; } = null!;

    #endregion Properties

    #region Constructors

    /// <inheritdoc/>
    public TopicDomainItemGetOperationHandler(
        IOperationsResource operationsResource,
        IResourceOfServiceDomainSQL resourceOfServiceDomainSQL,
        ITopicDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<TopicDomainItemGetOperationHandler> logger,
        IOptionsMonitor<SetupOptionsOfCommonCore> setupOptionsOfCommonCore)
        : base(
            domainResource.GetItemGetOperationName(),
            operationResource,
            logger,
            setupOptionsOfCommonCore)
    {
        _operationsResource = operationsResource;
        _resourceOfServiceDomainSQL = resourceOfServiceDomainSQL;

        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
        FunctionToTransformOperationResult = TransformOperationResult;
    }

    #endregion Constructors

    #region Private methods

    private TopicItemGetOperationInput TransformOperationInput(TopicItemGetOperationInput source)
    {
        source.Normalize();

        InvalidInputProperties = source.GetInvalidProperties(_resourceOfServiceDomainSQL, _operationsResource);

        if (InvalidInputProperties.Any())
        {
            var propertyNames = InvalidInputProperties.GetPropertyNames();

            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(propertyNames));
        }

        return source;
    }

    private TopicItemGetOperationOutput TransformOperationOutput(TopicItemGetOperationOutput source)
    {
        source.Item ??= new();

        return source;
    }


    private TopicItemGetOperationResult TransformOperationResult(TopicItemGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
