// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.Item.Get;

/// <summary>
/// Результат операции получения элемента "Тема в каталоге".
/// </summary>
public class CatalogTopicItemGetOperationResult : OperationResultWithOutput<CatalogTopicItemGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<NamedValues<string>> InvalidInputProperties { get; } = new();

    #endregion Properties
}
