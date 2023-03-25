// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Item.Get;

/// <summary>
/// Интерфейс обработчика операции получения элемента "Тема".
/// </summary>
public interface ITopicDomainItemGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        TopicDomainItemGetOperationInput,
        TopicDomainItemGetOperationOutput,
        TopicDomainItemGetOperationResult>
{
}
