// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Tree.Get;

/// <summary>
/// Интерфейс обработчика операции получения списка в домене "Тема в каталоге".
/// </summary>
public interface ICatalogTopicDomainTreeGetOperationHandler :
    IOperationWithInputAndOutputHandler<
        CatalogTopicTreeGetOperationInput,
        CatalogTopicTreeGetOperationOutput,
        CatalogTopicDomainTreeGetOperationResult>
{
}
