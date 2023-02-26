﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка "Статья в каталоге".
/// </summary>
public interface ICatalogArticleListGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        CatalogArticleListGetOperationInput,
        CatalogArticleListGetOperationOutput,
        CatalogArticleListGetOperationResult>
{
}
