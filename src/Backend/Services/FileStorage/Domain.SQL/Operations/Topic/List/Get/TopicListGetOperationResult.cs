// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.List.Get;

/// <summary>
/// Результат операции получения списка "Тема".
/// </summary>
public class TopicListGetOperationResult : OperationResultWithOutput<TopicListGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public OperationInputInvalidProperties InvalidInputProperties { get; set; } = null!;

    #endregion Properties
}
