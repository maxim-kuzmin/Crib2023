// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.Item.Save;

/// <summary>
/// Интерфейс обработчика операции сохранения элемента в домене "Статья".
/// </summary>
public interface IArticleDomainItemSaveOperationHandler :
    IOperationWithInputAndOutputHandler<
        ArticleTypeEntity,
        ArticleDomainItemGetOperationOutput,
        ArticleDomainItemSaveOperationResult>
{
}
