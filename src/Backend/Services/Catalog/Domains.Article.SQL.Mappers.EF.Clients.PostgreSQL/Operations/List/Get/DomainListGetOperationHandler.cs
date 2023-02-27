// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

/// <summary>
/// Обработчик операции получения списка в домене.
/// </summary>
public class DomainListGetOperationHandler :
    OperationWithInputAndOutputHandler<
        ArticleListGetOperationInput,
        ArticleListGetOperationOutput,
        ArticleListGetOperationResult>,
    IArticleListGetOperationHandler
{
    #region Fields

    private readonly IResourceOfCommonDataSQL _resourceOfCommonDataSQL;

    #endregion Fields

    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    private OperationInputInvalidProperties InvalidInputProperties { get; set; } = null!;

    #endregion Properties

    #region Constructors

    /// <inheritdoc/>
    public DomainListGetOperationHandler(
        IResourceOfCommonDataSQL resourceOfCommonDataSQL,
        IDomainResource domainResource,
        IResourceOfCommonCoreOperation resourceOfCommonCoreOperation,
        ILogger<DomainListGetOperationHandler> logger,
        IOptionsMonitor<SetupOptionsOfCommonCore> setupOptionsOfCommonCore)
        : base(
            domainResource.GetListGetOperationName(),
            resourceOfCommonCoreOperation,
            logger,
            setupOptionsOfCommonCore)
    {
        _resourceOfCommonDataSQL = resourceOfCommonDataSQL;

        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
        FunctionToTransformOperationResult = TransformOperationResult;
    }

    #endregion Constructors

    #region Private methods

    private ArticleListGetOperationInput TransformOperationInput(ArticleListGetOperationInput source)
    {
        source.Normalize();

        InvalidInputProperties = source.GetInvalidProperties(_resourceOfCommonDataSQL);

        if (InvalidInputProperties.Any())
        {
            var propertyNames = InvalidInputProperties.GetPropertyNames();

            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(propertyNames));
        }

        return source;
    }

    private ArticleListGetOperationOutput TransformOperationOutput(ArticleListGetOperationOutput source)
    {
        source.Items ??= Array.Empty<ArticleEntityForList>();

        return source;
    }

    private ArticleListGetOperationResult TransformOperationResult(ArticleListGetOperationResult source)
    {
        InvalidInputProperties.CopyToNamedValuesList(source.InvalidInputProperties);

        return source;
    }

    #endregion Private methods
}
