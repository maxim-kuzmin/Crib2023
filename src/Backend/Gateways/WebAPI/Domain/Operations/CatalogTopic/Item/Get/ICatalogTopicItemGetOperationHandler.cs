// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента "Тема в каталоге".
/// </summary>
public interface ICatalogTopicItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<CatalogTopicItemGetOperationInput, CatalogTopicItemGetOperationOutput>
{
}
