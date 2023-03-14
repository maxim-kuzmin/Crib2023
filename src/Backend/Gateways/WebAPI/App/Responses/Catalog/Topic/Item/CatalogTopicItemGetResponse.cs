// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Topic.Item;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения элемента "Тема в каталоге". 
/// </summary>
public class CatalogTopicItemGetResponse : WebAppResponseWithData<CatalogTopicItemGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicItemGetResponse(string operationCode, CatalogTopicItemGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
