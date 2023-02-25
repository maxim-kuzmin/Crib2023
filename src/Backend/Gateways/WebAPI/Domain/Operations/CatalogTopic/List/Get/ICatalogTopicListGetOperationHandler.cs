// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка "Тема в каталоге".
/// </summary>
public interface ICatalogTopicListGetOperationHandler :
    IOperationWithInputAndOutputHandler<CatalogTopicListGetOperationInput, CatalogTopicListGetOperationOutput>
{
}
