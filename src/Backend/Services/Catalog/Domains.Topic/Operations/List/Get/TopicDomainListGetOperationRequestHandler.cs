// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.List.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене.
/// </summary>
public class TopicDomainListGetOperationRequestHandler :
    IRequestHandler<TopicDomainListGetOperationRequest, TopicDomainListGetOperationResponse>
{
    #region Fields

    private readonly ITopicDomainListGetOperationHandler _operationHandler;

    private readonly ITopicDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public TopicDomainListGetOperationRequestHandler(
        ITopicDomainListGetOperationHandler operationHandler,
        ITopicDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<TopicDomainListGetOperationResponse> Handle(
        TopicDomainListGetOperationRequest request,
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

        return new TopicDomainListGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
