// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<ArticleItemGetOperationInput, ArticleItemGetOperationOutput>,
    IArticleItemGetOperationHandler
{
    #region Fields

    private readonly IDomainResource _domainResource;

    #endregion Fields

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
        _domainResource = domainResource;
        FunctionToTransformOperationInput = TransformOperationInput;
        FunctionToTransformOperationOutput = TransformOperationOutput;
    }

    #endregion Constructors

    #region Private methods

    private ArticleItemGetOperationInput TransformOperationInput(ArticleItemGetOperationInput input)
    {
        input ??= new ArticleItemGetOperationInput();

        input.Normalize();

        var invalidProperties = input.GetInvalidProperties();

        if (invalidProperties.Any())
        {
            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(invalidProperties));
        }

        return input;
    }

    private ArticleItemGetOperationOutput TransformOperationOutput(ArticleItemGetOperationOutput output)
    {
        output.Item ??= new ArticleEntity();

        if (output.IsItemNotFound)
        {
            throw new LocalizedException(_domainResource.GetErrorMessageForEntityNotFound());
        }

        return output;
    }

    #endregion Private methods
}
