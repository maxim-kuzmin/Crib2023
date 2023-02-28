// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.WebAppResponsesWithData;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения элемента "Тема в каталоге". 
/// </summary>
public class WebAppResponseWithCatalogTopicItemGetData : WebAppResponseWithData<CatalogTopicItemGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public WebAppResponseWithCatalogTopicItemGetData(string operationCode, CatalogTopicItemGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
