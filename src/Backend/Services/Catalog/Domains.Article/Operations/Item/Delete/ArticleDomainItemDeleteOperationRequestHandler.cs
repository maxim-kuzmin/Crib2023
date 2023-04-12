// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Delete;

/// <summary>
/// Обработчик запроса операции удаления элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemDeleteOperationRequestHandler :
    IRequestHandler<ArticleDomainItemDeleteOperationRequest, ArticleDomainItemDeleteOperationResponse>
{
    #region Fields

    private readonly IArticleDomainItemDeleteOperationHandler _operationHandler;

    private readonly IArticleDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public ArticleDomainItemDeleteOperationRequestHandler(
        IArticleDomainItemDeleteOperationHandler operationHandler,
        IArticleDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<ArticleDomainItemDeleteOperationResponse> Handle(
        ArticleDomainItemDeleteOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            await _repository.DeleteItem(request.Input).ConfigureAwait(false);

            _operationHandler.HandleSuccess();
        }
        catch (Exception ex)
        {
            _operationHandler.HandleError(ex);
        }

        return new ArticleDomainItemDeleteOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
