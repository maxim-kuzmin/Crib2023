// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.Tree.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене "Тема в каталоге".
/// </summary>
public class CatalogTopicDomainTreeGetOperationRequestHandler :
    IRequestHandler<CatalogTopicDomainTreeGetOperationRequest, CatalogTopicDomainTreeGetOperationResponse>
{
    #region Fields

    private readonly ICatalogTopicDomainTreeGetOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogTopic _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public CatalogTopicDomainTreeGetOperationRequestHandler(
        ICatalogTopicDomainTreeGetOperationHandler operationHandler,
        GrpcClientOfCatalogTopic client)
    {
        _operationHandler = operationHandler;
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<CatalogTopicDomainTreeGetOperationResponse> Handle(
        CatalogTopicDomainTreeGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            CatalogTopicTreeGetOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.GetTreeAsync(clientRequest, cancellationToken: cancellationToken);

            var clientReply = await task.ConfigureAwait(false);

            CatalogTopicDomainTreeGetOperationResult operationResult = new()
            {
                IsOk = clientReply.IsOk,
                OperationCode = clientReply.OperationCode,
                Output = clientReply.Output,
            };

            foreach (string errorMessage in clientReply.ErrorMessages)
            {
                operationResult.ErrorMessages.Add(errorMessage);
            }

            foreach (var invalidInputProperty in clientReply.InvalidInputProperties)
            {
                NamedValues<string> property = new(invalidInputProperty.Name, new(invalidInputProperty.Values.Count));

                foreach (string propertyValue in invalidInputProperty.Values)
                {
                    property.Values.Add(propertyValue);
                }

                operationResult.InvalidInputProperties.Add(property);
            }

            _operationHandler.HandleSuccessWithResult(operationResult);
        }
        catch (Exception ex)
        {
            _operationHandler.HandleError(ex);
        }

        return new CatalogTopicDomainTreeGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
