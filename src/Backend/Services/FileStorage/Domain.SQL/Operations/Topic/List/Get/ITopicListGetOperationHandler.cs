// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка "Тема".
/// </summary>
public interface ITopicListGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        TopicListGetOperationInput,
        TopicListGetOperationOutput,
        TopicListGetOperationResult>
{
}
