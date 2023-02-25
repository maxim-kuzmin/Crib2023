﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get;

/// <summary>
/// Обработчик операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationHandler :
    OperationWithInputAndOutputHandler<CatalogArticleItemGetOperationInput, CatalogArticleItemGetOperationOutput>,
    ICatalogArticleItemGetOperationHandler
{
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
    }

    #endregion Constructors

    #region Private methods

    private CatalogArticleItemGetOperationInput TransformOperationInput(CatalogArticleItemGetOperationInput input)
    {
        input ??= new();

        return input;
    }

    private CatalogArticleItemGetOperationOutput TransformOperationOutput(CatalogArticleItemGetOperationOutput output)
    {
        output.Item ??= new();

        return output;
    }

    #endregion Private methods
}
