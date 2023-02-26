// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.DataResponses;

/// <summary>
/// Отклик при получении данных элемента "Тема в каталоге". 
/// </summary>
public class CatalogTopicItemGetDataResponse : WebAppDataResponse<CatalogTopicItemGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicItemGetDataResponse(string operationCode, CatalogTopicItemGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
