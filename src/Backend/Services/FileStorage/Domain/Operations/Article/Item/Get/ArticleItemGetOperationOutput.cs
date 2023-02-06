// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Operations.Article.Item.Get;

/// <summary>
/// Выходные данные операции получения элемента "Статья".
/// </summary>
public class ArticleItemGetOperationOutput
{
    #region Properties

    /// <summary>
    /// Сущность.
    /// </summary>
    public ArticleEntity? Entity { get; set; }

    #endregion Properties
}
