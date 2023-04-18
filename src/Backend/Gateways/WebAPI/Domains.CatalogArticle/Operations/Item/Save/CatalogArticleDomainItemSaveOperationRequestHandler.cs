// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Operations.Item.Save;

/// <summary>
/// Обработчик запроса операции сохранения элемента в домене "Статья в каталоге".
/// </summary>
public class CatalogArticleDomainItemSaveOperationRequestHandler :
    IRequestHandler<CatalogArticleDomainItemSaveOperationRequest, CatalogArticleDomainItemSaveOperationResponse>
{
    #region Fields

    private readonly ICatalogArticleDomainItemSaveOperationHandler _operationHandler;

    private readonly GrpcClientOfCatalogArticle _client;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="operationHandler">Обработчик операции.</param>
    /// <param name="client">Клиент.</param>
    public CatalogArticleDomainItemSaveOperationRequestHandler(
        ICatalogArticleDomainItemSaveOperationHandler operationHandler,
        GrpcClientOfCatalogArticle client)
    {
        _operationHandler = operationHandler;
        _client = client;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<CatalogArticleDomainItemSaveOperationResponse> Handle(
        CatalogArticleDomainItemSaveOperationRequest request,
        CancellationToken cancellationToken)
    {
        try
        {
            _operationHandler.HandleStart(request.Input, request.OperationCode);

            CatalogArticleItemSaveOperationRequest clientRequest = new()
            {
                Input = request.Input,
                OperationCode = request.OperationCode,
            };

            var task = _client.SaveItemAsync(clientRequest, cancellationToken: cancellationToken);

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

        return new CatalogArticleDomainItemSaveOperationResponse(_operationHandler.OperationResult);
    }

    #endregion Public methods
}
