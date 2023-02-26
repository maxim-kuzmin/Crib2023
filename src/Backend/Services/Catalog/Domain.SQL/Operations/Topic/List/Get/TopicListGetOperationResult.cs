// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Topic.List.Get;

/// <summary>
/// Результат операции получения списка "Тема".
/// </summary>
public class TopicListGetOperationResult : OperationResultWithOutput<TopicListGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<string> InvalidInputProperties { get; set; } = null!;

    #endregion Properties
}
