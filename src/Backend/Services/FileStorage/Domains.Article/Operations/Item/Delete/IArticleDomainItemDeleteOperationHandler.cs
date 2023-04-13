// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Delete;

/// <summary>
/// Интерфейс обработчика операции удаления элемента в домене "Статья".
/// </summary>
public interface IArticleDomainItemDeleteOperationHandler :
    IOperationWithInputHandler<ArticleDomainItemGetOperationInput, ArticleDomainItemDeleteOperationResult>
{
}
