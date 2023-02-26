// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Operations.CatalogTopic.List.Get;

/// <summary>
/// Результат операции получения списка "Тема в каталоге".
/// </summary>
public class CatalogTopicListGetOperationResult : OperationResultWithOutput<CatalogTopicListGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<string> InvalidInputProperties { get; } = new();

    #endregion Properties
}