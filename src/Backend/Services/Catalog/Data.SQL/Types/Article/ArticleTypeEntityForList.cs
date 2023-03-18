// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Types.Article;

/// <summary>
/// Сущность типа "Статья для списка".
/// </summary>
public class ArticleTypeEntityForList
{
    #region Properties

    /// <summary>
    /// Идентификатор.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Глобальный идентификатор строки.
    /// </summary>
    public Guid RowGuid { get; set; } = Guid.NewGuid();

    /// <summary>
    /// Заголовок.
    /// </summary>
    public string Title { get; set; } = "";

    /// <summary>
    /// Идентификатор экземпляра сущности "Тема".
    /// </summary>
    public long TopicId { get; set; }

    #endregion Properties
}
