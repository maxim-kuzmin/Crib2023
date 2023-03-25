// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.Operations.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента "Статья".
/// </summary>
public interface IArticleDomainItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        ArticleDomainItemGetOperationInput,
        ArticleDomainItemGetOperationOutput,
        ArticleDomainItemGetOperationResult>
{
}
