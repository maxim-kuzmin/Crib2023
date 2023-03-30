// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.List.Get;

/// <summary>
/// Обработчик запроса операции получения списка в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainListGetOperationRequestHandler :
    IRequestHandler<CatalogArticleDomainListGetOperationRequest, CatalogArticleDomainListGetOperationResponse>
{
    #region Fields

    private readonly ICatalogArticleDomainListGetOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogArticle _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public CatalogArticleDomainListGetOperationRequestHandler(
        ICatalogArticleDomainListGetOperationHandler operationHandler,
        GrpcClientOfCatalogArticle client)
    {
        _operationHandler = operationHandler;
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<CatalogArticleDomainListGetOperationResponse> Handle(
        CatalogArticleDomainListGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            CatalogArticleListGetOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.GetListAsync(clientRequest, cancellationToken: cancellationToken);

            var clientReply = await task.ConfigureAwait(false);

            CatalogArticleDomainListGetOperationResult operationResult = new()
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

        return new CatalogArticleDomainListGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
