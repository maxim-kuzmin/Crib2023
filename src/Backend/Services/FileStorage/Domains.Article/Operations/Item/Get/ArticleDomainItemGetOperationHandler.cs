// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class ArticleDomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        ArticleItemGetOperationInput,
        ArticleItemGetOperationOutput,
        ArticleItemGetOperationResult>,
    IArticleItemGetOperationHandler
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
    public ArticleDomainItemGetOperationHandler(
        IOperationsResource operationsResource,
        IResourceOfServiceDomainSQL resourceOfServiceDomainSQL,
        IArticleDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<ArticleDomainItemGetOperationHandler> logger,
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

    private ArticleItemGetOperationInput TransformOperationInput(ArticleItemGetOperationInput source)
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

    private ArticleItemGetOperationOutput TransformOperationOutput(ArticleItemGetOperationOutput source)
    {
        source.Item ??= new();

        return source;
    }

    private ArticleItemGetOperationResult TransformOperationResult(ArticleItemGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
