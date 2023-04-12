// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Save;

/// <summary>
/// Обработчик запроса операции сохранения элемента в домене "Статья".
/// </summary>
public class ArticleDomainItemSaveOperationRequestHandler :
    IRequestHandler<ArticleDomainItemSaveOperationRequest, ArticleDomainItemSaveOperationResponse>
{
    #region Fields

    private readonly IArticleDomainItemSaveOperationHandler _operationHandler;

    private readonly IArticleDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public ArticleDomainItemSaveOperationRequestHandler(
        IArticleDomainItemSaveOperationHandler operationHandler,
        IArticleDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<ArticleDomainItemSaveOperationResponse> Handle(
        ArticleDomainItemSaveOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            var operationOutput = await _repository.SaveItem(request.Input).ConfigureAwait(false);

            _operationHandler.HandleSuccess(operationOutput);
        }
        catch (Exception ex)
        {
            _operationHandler.HandleError(ex);
        }

        return new ArticleDomainItemSaveOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
