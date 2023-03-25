// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Item.Get;

/// <summary>
/// Обработчик запроса операции получения элемента в домене.
/// </summary>
public class TopicDomainItemGetOperationRequestHandler :
    IRequestHandler<TopicDomainItemGetOperationRequest, TopicDomainItemGetOperationResponse>
{
    #region Fields

    private readonly ITopicDomainItemGetOperationHandler _operationHandler;

    private readonly ITopicDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public TopicDomainItemGetOperationRequestHandler(
        ITopicDomainItemGetOperationHandler operationHandler,
        ITopicDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<TopicDomainItemGetOperationResponse> Handle(
        TopicDomainItemGetOperationRequest request,
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

        return new TopicDomainItemGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
