// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Item.Get;

/// <summary>
/// Обработчик запроса операции получения элемента в домене.
/// </summary>
public class DomainItemGetOperationRequestHandler :
    IRequestHandler<DomainItemGetOperationRequest, DomainItemGetOperationResponse>
{
    #region Fields

    private readonly ICatalogTopicItemGetOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogTopic _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public DomainItemGetOperationRequestHandler(
        ICatalogTopicItemGetOperationHandler operationHandler,
        GrpcClientOfCatalogTopic client)
    {
        _operationHandler = operationHandler;
        _client = client;
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

            CatalogTopicItemGetOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.GetItemAsync(clientRequest, cancellationToken: cancellationToken);

            var clientReply = await task.ConfigureAwait(false);

            OperationResultWithOutput<CatalogTopicItemGetOperationOutput> operationResult = new()
            {
                IsOk = clientReply.IsOk,
                OperationCode = clientReply.OperationCode,
                Output = clientReply.Output,
            };

            foreach (string errorMessage in clientReply.ErrorMessages)
            {
                operationResult.ErrorMessages.Add(errorMessage);
            }

            _operationHandler.OnSuccessWithResult(operationResult);
        }
        catch (Exception ex)
        {
            _operationHandler.OnError(ex);
        }

        return new DomainItemGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
