// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.Item.Delete;

/// <summary>
/// Интерфейс обработчика операции удаления элемента в домене "Статья в каталоге".
/// </summary>
public interface ICatalogArticleDomainItemDeleteOperationHandler :
    IOperationWithInputHandler<
        CatalogArticleItemGetOperationInput,
        CatalogArticleDomainItemDeleteOperationResult>
{
}
