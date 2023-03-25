// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        ArticleDomainItemGetOperationInput,
        ArticleDomainItemGetOperationOutput,
        ArticleDomainItemGetOperationResult>,
    IArticleDomainItemGetOperationHandler
{
    #region Fields

    private readonly IArticleDomainResource _domainResource;

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
    public ArticleDomainItemGetOperationHandler(
        IArticleDomainResource domainResource,
        IOperationsResource operationsResource,        
        IOperationResource operationResource,
        ILogger<ArticleDomainItemGetOperationHandler> logger,
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

    private ArticleDomainItemGetOperationInput TransformOperationInput(ArticleDomainItemGetOperationInput source)
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

    private ArticleDomainItemGetOperationOutput TransformOperationOutput(ArticleDomainItemGetOperationOutput source)
    {
        source.Item ??= new();

        return source;
    }

    private ArticleDomainItemGetOperationResult TransformOperationResult(ArticleDomainItemGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
