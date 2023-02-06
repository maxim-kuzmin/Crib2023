// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Article;

/// <summary>
/// Сущность типа "Статья".
/// </summary>
public class ArticleTypeEntity
{
    #region Properties

    /// <summary>
    /// Хэш.
    /// </summary>
    public string? Hash { get; set; }

    /// <summary>
    /// Идентификатор.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Путь.
    /// </summary>
    public string? Path { get; set; }

    /// <summary>
    /// Заголовок.
    /// </summary>
    public string? Title { get; set; }

    /// <summary>
    /// Идентификатор экземпляра сущности "Тема".
    /// </summary>
    public long TopicId { get; set; }

    #endregion Properties
}
