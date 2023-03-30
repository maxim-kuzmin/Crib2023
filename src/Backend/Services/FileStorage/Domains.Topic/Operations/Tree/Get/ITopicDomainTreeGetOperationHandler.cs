// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Интерфейс обработчика операции получения дерева в домене "Тема".
/// </summary>
public interface ITopicDomainTreeGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        TopicDomainTreeGetOperationInput,
        TopicDomainTreeGetOperationOutput,
        TopicDomainTreeGetOperationResult>
{
}
