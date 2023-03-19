// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Core;

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Operations.List.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене.
/// </summary>
public class CatalogTopicDomainListGetOperationRequestHandler :
    IRequestHandler<CatalogTopicDomainListGetOperationRequest, CatalogTopicDomainListGetOperationResponse>
{
    #region Fields

    private readonly ICatalogTopicListGetOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogTopic _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public CatalogTopicDomainListGetOperationRequestHandler(
        ICatalogTopicListGetOperationHandler operationHandler,
        GrpcClientOfCatalogTopic client)
    {
        _operationHandler = operationHandler;
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<CatalogTopicDomainListGetOperationResponse> Handle(
        CatalogTopicDomainListGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.OnStart(request.Input, request.OperationCode);

            CatalogTopicListGetOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.GetListAsync(clientRequest, cancellationToken: cancellationToken);

            var clientReply = await task.ConfigureAwait(false);

            CatalogTopicListGetOperationResult operationResult = new()
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

            _operationHandler.OnSuccessWithResult(operationResult);
        }
        catch (Exception ex)
        {
            _operationHandler.OnError(ex);
        }

        return new CatalogTopicDomainListGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
