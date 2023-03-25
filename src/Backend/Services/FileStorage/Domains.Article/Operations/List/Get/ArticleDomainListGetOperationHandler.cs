// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;

/// <summary>
/// Обработчик операции получения списка в домене.
/// </summary>
public class ArticleDomainListGetOperationHandler :
    OperationWithInputAndOutputHandler<
        ArticleDomainListGetOperationInput,
        ArticleDomainListGetOperationOutput,
        ArticleDomainListGetOperationResult>,
    IArticleDomainListGetOperationHandler
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
    public ArticleDomainListGetOperationHandler(
        IArticleDomainResource domainResource,
        IOperationsResource operationsResource,        
        IOperationResource operationResource,
        ILogger<ArticleDomainListGetOperationHandler> logger,
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

    private ArticleDomainListGetOperationInput TransformOperationInput(ArticleDomainListGetOperationInput source)
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

    private ArticleDomainListGetOperationOutput TransformOperationOutput(ArticleDomainListGetOperationOutput source)
    {
        source.Items ??= Array.Empty<ArticleDomainEntity>();

        return source;
    }

    private ArticleDomainListGetOperationResult TransformOperationResult(ArticleDomainListGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
