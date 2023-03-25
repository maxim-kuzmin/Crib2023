// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class TopicDomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        TopicDomainItemGetOperationInput,
        TopicDomainItemGetOperationOutput,
        TopicDomainItemGetOperationResult>,
    ITopicDomainItemGetOperationHandler
{
    #region Fields

    private readonly ITopicDomainResource _domainResource;

    private readonly IOperationsResource _operationsResource;    

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
        ITopicDomainResource domainResource,
        IOperationsResource operationsResource,        
        IOperationResource operationResource,
        ILogger<TopicDomainItemGetOperationHandler> logger,
        IOptionsMonitor<SetupOptionsOfCommonCore> setupOptionsOfCommonCore)
        : base(
            domainResource.GetItemGetOperationName(),
            operationResource,
            logger,
            setupOptionsOfCommonCore)
    {
        _domainResource = domainResource;
        _operationsResource = operationsResource;        

        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
        FunctionToTransformOperationResult = TransformOperationResult;
    }

    #endregion Constructors

    #region Private methods

    private TopicDomainItemGetOperationInput TransformOperationInput(TopicDomainItemGetOperationInput source)
    {
        source.Normalize();

        InvalidInputProperties = source.GetInvalidProperties(_domainResource, _operationsResource);

        if (InvalidInputProperties.Any())
        {
            var propertyNames = InvalidInputProperties.GetPropertyNames();

            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(propertyNames));
        }

        return source;
    }

    private TopicDomainItemGetOperationOutput TransformOperationOutput(TopicDomainItemGetOperationOutput source)
    {
        source.Item ??= new();

        return source;
    }


    private TopicDomainItemGetOperationResult TransformOperationResult(TopicDomainItemGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
