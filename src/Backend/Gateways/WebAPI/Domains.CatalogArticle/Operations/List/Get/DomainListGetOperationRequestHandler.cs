﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене.
/// </summary>
public class DomainListGetOperationRequestHandler :
    IRequestHandler<DomainListGetOperationRequest, DomainListGetOperationResponse>
{
    #region Fields

    private readonly ICatalogArticleListGetOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogArticle _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public DomainListGetOperationRequestHandler(
        ICatalogArticleListGetOperationHandler operationHandler,
        GrpcClientOfCatalogArticle client)
    {
        _operationHandler = operationHandler;
        _client = client;
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
            _operationHandler.OnStart(request.Input, request.OperationCode);

            CatalogArticleListGetOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.GetListAsync(clientRequest, cancellationToken: cancellationToken);

            var clientReply = await task.ConfigureAwait(false);

            CatalogArticleListGetOperationResult operationResult = new()
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

        return new DomainListGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
