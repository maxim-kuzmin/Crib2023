// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Types.Article;

/// <summary>
/// Сущность типа "Статья".
/// </summary>
public class ArticleTypeEntity : ArticleTypeEntityForList
{
    #region Properties

    /// <summary>
    /// Тело.
    /// </summary>
    public string Body { get; set; } = "";

    #endregion Properties
}
