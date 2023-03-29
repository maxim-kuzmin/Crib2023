// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Обработчик запроса операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationRequestHandler :
    IRequestHandler<TopicDomainTreeGetOperationRequest, TopicDomainTreeGetOperationResponse>
{
    #region Fields

    private readonly ITopicDomainTreeGetOperationHandler _operationHandler;

    private readonly ITopicDomainRepository _repository;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="repository">Репозиторий.</param>
    public TopicDomainTreeGetOperationRequestHandler(
        ITopicDomainTreeGetOperationHandler operationHandler,
        ITopicDomainRepository repository)
    {
        _operationHandler = operationHandler;
        _repository = repository;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<TopicDomainTreeGetOperationResponse> Handle(
        TopicDomainTreeGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            var operationOutput = await _repository.GetTree(request.Input).ConfigureAwait(false);

            _operationHandler.HandleSuccess(operationOutput);
        }
        catch (Exception ex)
        {
            _operationHandler.HandleError(ex);
        }

        return new TopicDomainTreeGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
