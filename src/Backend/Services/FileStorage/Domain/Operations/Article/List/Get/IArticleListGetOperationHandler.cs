﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Operations.Article.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка "Статья".
/// </summary>
public interface IArticleListGetOperationHandler :
    IOperationWithInputAndOutputHandler<ArticleListGetOperationInput, ArticleListGetOperationOutput>
{
}