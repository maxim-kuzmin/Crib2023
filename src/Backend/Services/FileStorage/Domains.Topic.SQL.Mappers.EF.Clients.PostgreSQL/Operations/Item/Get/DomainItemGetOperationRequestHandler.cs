// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL.Operations.Item.Get;

/// <summary>
/// Обработчик запроса операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationRequestHandler :
    IRequestHandler<DomainItemGetOperationRequest, DomainItemGetOperationResponse>
{
    #region Fields

    private readonly ITopicItemGetOperationHandler _operationHandler;

    private readonly ITopicRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public DomainItemGetOperationRequestHandler(
        ITopicItemGetOperationHandler operationHandler,
        ITopicRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<DomainItemGetOperationResponse> Handle(
        DomainItemGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.OnStart(request.Input, request.OperationCode);

            var operationOutput = await _repository.GetItem(request.Input).ConfigureAwait(false);

            _operationHandler.OnSuccess(operationOutput);
        }
        catch (Exception ex)
        {
            _operationHandler.OnError(ex);
        }

        return new DomainItemGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
