// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        TopicItemGetOperationInput,
        TopicItemGetOperationOutput,
        TopicItemGetOperationResult>,
    ITopicItemGetOperationHandler
{
    #region Fields

    private readonly IResourceOfCommonDataSQL _resourceOfCommonDataSQL;

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
    public DomainItemGetOperationHandler(
        IResourceOfCommonDataSQL resourceOfCommonDataSQL,
        IResourceOfServiceDomainSQL resourceOfServiceDomainSQL,
        IDomainResource domainResource,
        IResourceOfCommonCoreOperation resourceOfCommonCoreOperation,
        ILogger<DomainItemGetOperationHandler> logger,
        IOptionsMonitor<SetupOptionsOfCommonCore> setupOptionsOfCommonCore)
        : base(
            domainResource.GetItemGetOperationName(),
            resourceOfCommonCoreOperation,
            logger,
            setupOptionsOfCommonCore)
    {
        _resourceOfCommonDataSQL = resourceOfCommonDataSQL;
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

        InvalidInputProperties = source.GetInvalidProperties(_resourceOfServiceDomainSQL, _resourceOfCommonDataSQL);

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
        source.InvalidInputProperties = InvalidInputProperties;

        return source;
    }

    #endregion Private methods
}
