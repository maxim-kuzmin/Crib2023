// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.DataResponses;

/// <summary>
/// Отклик при получении данных списка "Тема в каталоге". 
/// </summary>
public class CatalogTopicListGetDataResponse : WebAppDataResponse<CatalogTopicListGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicListGetDataResponse(string operationCode, CatalogTopicListGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
