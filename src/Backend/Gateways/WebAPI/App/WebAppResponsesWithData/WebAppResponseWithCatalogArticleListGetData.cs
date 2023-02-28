// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.WebAppResponsesWithData;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения списка "Статья в каталоге". 
/// </summary>
public class WebAppResponseWithCatalogArticleListGetData : WebAppResponseWithData<CatalogArticleListGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public WebAppResponseWithCatalogArticleListGetData(string operationCode, CatalogArticleListGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
