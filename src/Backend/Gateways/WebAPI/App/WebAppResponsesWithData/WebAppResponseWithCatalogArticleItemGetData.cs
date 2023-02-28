// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.WebAppResponsesWithData;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения элемента "Статья в каталоге". 
/// </summary>
public class WebAppResponseWithCatalogArticleItemGetData : WebAppResponseWithData<CatalogArticleItemGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public WebAppResponseWithCatalogArticleItemGetData(string operationCode, CatalogArticleItemGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
