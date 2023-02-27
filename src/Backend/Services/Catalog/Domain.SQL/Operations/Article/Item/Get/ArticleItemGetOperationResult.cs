// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Core;

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Operations.Article.Item.Get;

/// <summary>
/// Результат операции получения элемента "Статья".
/// </summary>
public class ArticleItemGetOperationResult : OperationResultWithOutput<ArticleItemGetOperationOutput>
{
    #region Properties

    /// <summary>
    /// Список свойств с недействительными значениями во входных данных.
    /// </summary>
    public List<NamedValues<string>> InvalidInputProperties { get; } = new();

    #endregion Properties
}
