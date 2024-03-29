﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Get;

/// <summary>
/// Обработчик запроса операции получения элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemGetOperationRequestHandler :
    IRequestHandler<ArticleDomainItemGetOperationRequest, ArticleDomainItemGetOperationResponse>
{
    #region Fields

    private readonly IArticleDomainItemGetOperationHandler _operationHandler;

    private readonly IArticleDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public ArticleDomainItemGetOperationRequestHandler(
        IArticleDomainItemGetOperationHandler operationHandler,
        IArticleDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<ArticleDomainItemGetOperationResponse> Handle(
        ArticleDomainItemGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            var operationOutput = await _repository.GetItem(request.Input).ConfigureAwait(false);

            _operationHandler.HandleSuccess(operationOutput);
        }
        catch (Exception ex)
        {
            _operationHandler.HandleError(ex);
        }

        return new ArticleDomainItemGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
