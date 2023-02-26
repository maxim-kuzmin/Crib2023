// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента "Статья в каталоге".
/// </summary>
public interface ICatalogArticleItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        CatalogArticleItemGetOperationInput,
        CatalogArticleItemGetOperationOutput,
        CatalogArticleItemGetOperationResult>
{
}
