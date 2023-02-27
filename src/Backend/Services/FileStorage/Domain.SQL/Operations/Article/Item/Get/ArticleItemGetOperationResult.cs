// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Article.Item.Get;

/// <summary>
/// Результат операции получения элемента "Статья".
/// </summary>
public class ArticleItemGetOperationResult : OperationResultWithOutput<ArticleItemGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public OperationInputInvalidProperties InvalidInputProperties { get; set; } = null!;

    #endregion Properties
}
