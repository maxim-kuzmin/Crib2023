// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Responses.Catalog.Topic.Tree;

/// <summary>
/// Отклик веб-приложения, содержащий данные получения дерева "Тема в каталоге". 
/// </summary>
public class CatalogTopicTreeGetResponse : WebAppResponseWithData<CatalogTopicTreeGetOperationOutput>
{
    #region Constructors

    /// <inheritdoc/>
    public CatalogTopicTreeGetResponse(string operationCode, CatalogTopicTreeGetOperationOutput data)
        : base(operationCode, data)
    {
    }

    #endregion Constructors
}
