// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.DataResponses;

/// <summary>
/// Отклик при получении данных элемента "Статья в каталоге". 
/// </summary>
public class CatalogArticleItemGetDataResponse : WebAppDataResponse<CatalogArticleItemGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleItemGetDataResponse(string operationCode, CatalogArticleItemGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
