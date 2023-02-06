// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.List.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене.
/// </summary>
public class DomainListGetOperationRequestHandler :
    IRequestHandler<DomainListGetOperationRequest, DomainListGetOperationResponse>
{
    #region Properties

    private IArticleItemGetOperationHandler OperationHandler { get; init; }

    private IArticleRepository Repository { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public DomainListGetOperationRequestHandler(
        IArticleItemGetOperationHandler operationHandler,
        IArticleRepository repository)
    {
        OperationHandler = operationHandler;
        Repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<DomainListGetOperationResponse> Handle(
        DomainListGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            OperationHandler.OnStart(request.Input, request.OperationCode);

            var operationOutput = await Repository.GetItem(request.Input);

            OperationHandler.OnSuccess(operationOutput);
        }
        catch (Exception ex)
        {
            OperationHandler.OnError(ex);
        }

        return new DomainListGetOperationResponse(OperationHandler.OperationResult);
    }

    #endregion Public methods
}
