// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Grpc.Backend.Services.Catalog;

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogArticle.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка в домене "Статья в каталоге".
/// </summary>
public interface ICatalogArticleDomainListGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        CatalogArticleListGetOperationInput,
        CatalogArticleListGetOperationOutput,
        CatalogArticleDomainListGetOperationResult>
{
}
