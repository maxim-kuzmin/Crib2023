// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.Item.Get;

/// <summary>
/// Результат операции получения элемента "Тема".
/// </summary>
public class TopicItemGetOperationResult : OperationResultWithOutput<TopicItemGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<string> InvalidInputProperties { get; set; } = null!;

    #endregion Properties
}
