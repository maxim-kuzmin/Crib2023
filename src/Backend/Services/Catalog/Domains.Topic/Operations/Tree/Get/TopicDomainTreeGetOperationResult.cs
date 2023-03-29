// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Результат операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationResult : OperationResultWithOutput<TopicDomainTreeGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<NamedValues<string>> InvalidInputProperties { get; } = new();

    #endregion Properties
}
