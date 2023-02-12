// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента "Статья".
/// </summary>
public interface IArticleItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<ArticleItemGetOperationInput, ArticleItemGetOperationOutput>
{
}
