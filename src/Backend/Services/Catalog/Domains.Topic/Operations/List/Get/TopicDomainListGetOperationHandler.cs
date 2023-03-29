// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.List.Get;

/// <summary>
/// Обработчик операции получения списка в домене "Тема".
/// </summary>
public class TopicDomainListGetOperationHandler :
    OperationWithInputAndOutputHandler<
        TopicDomainListGetOperationInput,
        TopicDomainListGetOperationOutput,
        TopicDomainListGetOperationResult>,
    ITopicDomainListGetOperationHandler
{
    #region Fields

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
    public TopicDomainListGetOperationHandler(
        ITopicDomainResource domainResource,
        IOperationsResource operationsResource,        
        IOperationResource operationResource,
        ILogger<TopicDomainListGetOperationHandler> logger,
        IOptionsMonitor<SetupOptionsOfCommonCore> setupOptionsOfCommonCore)
        : base(
            domainResource.GetListGetOperationName(),
            operationResource,
            logger,
            setupOptionsOfCommonCore)
    {
        _operationsResource = operationsResource;

        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
        FunctionToTransformOperationResult = TransformOperationResult;
    }

    #endregion Constructors

    #region Private methods

    private TopicDomainListGetOperationInput TransformOperationInput(TopicDomainListGetOperationInput source)
    {
        source.Normalize();

        InvalidInputProperties = source.GetInvalidProperties(_operationsResource);

        if (InvalidInputProperties.Any())
        {
            var propertyNames = InvalidInputProperties.GetPropertyNames();

            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(propertyNames));
        }

        return source;
    }

    private TopicDomainListGetOperationOutput TransformOperationOutput(TopicDomainListGetOperationOutput source)
    {
        source.Items ??= Array.Empty<TopicDomainEntityForItem>();

        return source;
    }

    private TopicDomainListGetOperationResult TransformOperationResult(TopicDomainListGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
