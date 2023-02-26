// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.DataResponses;

/// <summary>
/// Отклик при получении данных списка "Статья в каталоге". 
/// </summary>
public class CatalogArticleListGetDataResponse : WebAppDataResponse<CatalogArticleListGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogArticleListGetDataResponse(string operationCode, CatalogArticleListGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
