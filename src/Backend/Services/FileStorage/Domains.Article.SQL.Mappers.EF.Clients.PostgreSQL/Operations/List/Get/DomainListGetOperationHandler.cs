// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

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
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    private List<string> InvalidInputProperties { get; set; } = null!;

    #endregion Properties

    #region Constructors

    /// <inheritdoc/>
    public DomainListGetOperationHandler(
        IDomainResource domainResource,
        IOperationResource operationResource,
        ILogger<DomainListGetOperationHandler> logger,
        IOptionsMonitor<SetupOptions> setupOptions)
        : base(
            domainResource.GetListGetOperationName(),
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

    private ArticleListGetOperationInput TransformOperationInput(ArticleListGetOperationInput input)
    {
        input.Normalize();

        InvalidInputProperties = input.GetInvalidProperties();

        if (InvalidInputProperties.Any())
        {
            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(InvalidInputProperties));
        }

        return input;
    }

    private ArticleListGetOperationOutput TransformOperationOutput(ArticleListGetOperationOutput output)
    {
        output.Items ??= Array.Empty<ArticleEntity>();

        return output;
    }

    private ArticleListGetOperationResult TransformOperationResult(ArticleListGetOperationResult source)
    {
        source.InvalidInputProperties = InvalidInputProperties;

        return source;
    }

    #endregion Private methods
}
