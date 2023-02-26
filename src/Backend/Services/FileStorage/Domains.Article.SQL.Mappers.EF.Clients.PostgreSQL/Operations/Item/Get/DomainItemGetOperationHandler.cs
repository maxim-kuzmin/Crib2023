// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<
        ArticleItemGetOperationInput,
        ArticleItemGetOperationOutput,
        ArticleItemGetOperationResult>,
    IArticleItemGetOperationHandler
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    private List<string> InvalidInputProperties { get; set; } = null!;

    #endregion Properties

    #region Constructors

    /// <inheritdoc/>
    public DomainItemGetOperationHandler(
        IDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<DomainItemGetOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetItemGetOperationName(),
            operationResource,
            logger,
            setupOptions)
    {
        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
        FunctionToTransformOperationResult = TransformOperationResult;
    }

    #endregion Constructors

    #region Private methods

    private ArticleItemGetOperationInput TransformOperationInput(ArticleItemGetOperationInput source)
    {
        source.Normalize();

        InvalidInputProperties = source.GetInvalidProperties();

        if (InvalidInputProperties.Any())
        {
            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(InvalidInputProperties));
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
        source.InvalidInputProperties = InvalidInputProperties;

        return source;
    }

    #endregion Private methods
}
