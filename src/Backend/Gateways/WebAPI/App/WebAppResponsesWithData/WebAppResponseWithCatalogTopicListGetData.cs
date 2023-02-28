// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.WebAppResponsesWithData;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения списка "Тема в каталоге". 
/// </summary>
public class WebAppResponseWithCatalogTopicListGetData : WebAppResponseWithData<CatalogTopicListGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public WebAppResponseWithCatalogTopicListGetData(string operationCode, CatalogTopicListGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
