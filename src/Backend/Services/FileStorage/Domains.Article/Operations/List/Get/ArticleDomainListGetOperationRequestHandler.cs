// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене "Статья".
/// </summary>
public class ArticleDomainListGetOperationRequestHandler :
    IRequestHandler<ArticleDomainListGetOperationRequest, ArticleDomainListGetOperationResponse>
{
    #region Fields

    private readonly IArticleDomainListGetOperationHandler _operationHandler;

    private readonly IArticleDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public ArticleDomainListGetOperationRequestHandler(
        IArticleDomainListGetOperationHandler operationHandler,
        IArticleDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<ArticleDomainListGetOperationResponse> Handle(
        ArticleDomainListGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            var operationOutput = await _repository.GetList(request.Input).ConfigureAwait(false);

            _operationHandler.HandleSuccess(operationOutput);
        }
        catch (Exception ex)
        {
            _operationHandler.HandleError(ex);
        }

        return new ArticleDomainListGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
