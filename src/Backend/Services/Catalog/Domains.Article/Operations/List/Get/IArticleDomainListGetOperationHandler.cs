// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка в домене "Статья".
/// </summary>
public interface IArticleDomainListGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        ArticleDomainListGetOperationInput,
        ArticleDomainListGetOperationOutput,
        ArticleDomainListGetOperationResult>
{
}
