// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Get;

/// <summary>
/// Обработчик запроса операции получения элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemGetOperationRequestHandler :
    IRequestHandler<CatalogArticleDomainItemGetOperationRequest, CatalogArticleDomainItemGetOperationResponse>
{
    #region Fields

    private readonly ICatalogArticleDomainItemGetOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogArticle _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public CatalogArticleDomainItemGetOperationRequestHandler(
        ICatalogArticleDomainItemGetOperationHandler operationHandler,
        GrpcClientOfCatalogArticle client)
    {
        _operationHandler = operationHandler;
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<CatalogArticleDomainItemGetOperationResponse> Handle(
        CatalogArticleDomainItemGetOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            CatalogArticleItemGetOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.GetItemAsync(clientRequest, cancellationToken: cancellationToken);

            var clientReply = await task.ConfigureAwait(false);

            CatalogArticleDomainItemGetOperationResult operationResult = new()
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

        return new CatalogArticleDomainItemGetOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
