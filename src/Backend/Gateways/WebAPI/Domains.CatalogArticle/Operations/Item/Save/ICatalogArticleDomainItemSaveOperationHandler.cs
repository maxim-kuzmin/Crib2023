// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.Item.Save;

/// <summary>
/// Интерфейс обработчика операции сохранения элемента в домене "Статья в каталоге".
/// </summary>
public interface ICatalogArticleDomainItemSaveOperationHandler :
    IOperationWithInputAndOutputHandler<
        CatalogArticleTypeEntity,
        CatalogArticleItemGetOperationOutput,
        CatalogArticleDomainItemGetOperationResult>
{
}
