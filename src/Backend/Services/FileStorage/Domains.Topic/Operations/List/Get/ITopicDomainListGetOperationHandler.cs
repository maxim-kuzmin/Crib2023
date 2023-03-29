// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.List.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка в домене "Тема".
/// </summary>
public interface ITopicDomainListGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        TopicDomainListGetOperationInput,
        TopicDomainListGetOperationOutput,
        TopicDomainListGetOperationResult>
{
}
