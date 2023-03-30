// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Обработчик операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationHandler :
    OperationWithInputAndOutputHandler<
        TopicDomainTreeGetOperationInput,
        TopicDomainTreeGetOperationOutput,
        TopicDomainTreeGetOperationResult>,
    ITopicDomainTreeGetOperationHandler
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
    public TopicDomainTreeGetOperationHandler(
        ITopicDomainResource domainResource,
        IOperationsResource operationsResource,        
        IOperationResource operationResource,
        ILogger<TopicDomainTreeGetOperationHandler> logger,
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

    private TopicDomainTreeGetOperationInput TransformOperationInput(TopicDomainTreeGetOperationInput source)
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

    private TopicDomainTreeGetOperationOutput TransformOperationOutput(TopicDomainTreeGetOperationOutput source)
    {
        source.Nodes ??= Array.Empty<TopicDomainEntityForTree>();

        return source;
    }

    private TopicDomainTreeGetOperationResult TransformOperationResult(TopicDomainTreeGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
