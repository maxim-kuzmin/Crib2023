﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Operations.List.Get;

/// <summary>
/// Обработчик операции получения списка в домене.
/// </summary>
public class DomainListGetOperationHandler :
    OperationWithInputAndOutputHandler<ArticleListGetOperationInput, ArticleListGetOperationOutput>,
    IArticleListGetOperationHandler
{
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
    }

    #endregion Constructors

    #region Private methods

    private ArticleListGetOperationInput TransformOperationInput(ArticleListGetOperationInput input)
    {
        input ??= new ArticleListGetOperationInput();

        input.Normalize();

        var invalidProperties = input.GetInvalidProperties();

        if (invalidProperties.Any())
        {
            throw new LocalizedException(OperationResource.GetErrorMessageForInvalidInput(invalidProperties));
        }

        return input;
    }

    #endregion Private methods
}