// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Delete;

/// <summary>
/// Обработчик операции удаления элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemDeleteOperationHandler :
    OperationWithInputHandler<ArticleDomainItemGetOperationInput, ArticleDomainItemDeleteOperationResult>,
    IArticleDomainItemDeleteOperationHandler
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
    public ArticleDomainItemDeleteOperationHandler(
        IArticleDomainResource domainResource,
        IOperationsResource operationsResource,        
        IOperationResource operationResource,
        ILogger<ArticleDomainItemDeleteOperationHandler> logger,
        IOptionsMonitor<SetupOptionsOfCommonCore> setupOptionsOfCommonCore)
        : base(
            domainResource.GetItemDeleteOperationName(),
            operationResource,
            logger,
            setupOptionsOfCommonCore)
    {
        _domainResource = domainResource;
        _operationsResource = operationsResource;        

        FunctionToTransformOperationInput = TransformOperationInput;
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

    private ArticleDomainItemDeleteOperationResult TransformOperationResult(ArticleDomainItemDeleteOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
