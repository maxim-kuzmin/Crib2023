﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.List.Get;

/// <summary>
/// Результат операции получения списка "Статья".
/// </summary>
public class ArticleListGetOperationResult : OperationResultWithOutput<ArticleListGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public OperationInputInvalidProperties InvalidInputProperties { get; set; } = null!;

    #endregion Properties
}
