// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Topic.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента "Тема".
/// </summary>
public interface ITopicItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<TopicItemGetOperationInput, TopicItemGetOperationOutput>
{
}
