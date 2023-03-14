// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Article.Item;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения элемента "Статья в каталоге". 
/// </summary>
public class CatalogArticleItemGetResponse : WebAppResponseWithData<CatalogArticleItemGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleItemGetResponse(string operationCode, CatalogArticleItemGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
