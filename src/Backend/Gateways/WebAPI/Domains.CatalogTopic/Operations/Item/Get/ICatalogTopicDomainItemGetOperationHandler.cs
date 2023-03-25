// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента в домене "Тема в каталоге".
/// </summary>
public interface ICatalogTopicDomainItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        CatalogTopicItemGetOperationInput,
        CatalogTopicItemGetOperationOutput,
        CatalogTopicItemGetOperationResult>
{
}
