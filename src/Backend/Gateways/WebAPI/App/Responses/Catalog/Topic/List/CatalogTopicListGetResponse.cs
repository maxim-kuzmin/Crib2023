// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Topic.List;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения списка "Тема в каталоге". 
/// </summary>
public class CatalogTopicListGetResponse : WebAppResponseWithData<CatalogTopicListGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicListGetResponse(string operationCode, CatalogTopicListGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
