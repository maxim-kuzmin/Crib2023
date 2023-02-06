// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;

/// <summary>
/// Сущность типа "Тема".
/// </summary>
public class TopicTypeEntity
{
    #region Properties

    /// <summary>
    /// Идентификатор.
    /// </summary>
    public long Id { get; set; }

    /// <summary>
    /// Название.
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// Идентификатор родителя.
    /// </summary>
    public long? ParentId { get; set; }

    /// <summary>
    /// Число детей в дереве.
    /// </summary>
    public long TreeChildCount { get; set; }

    /// <summary>
    /// Число потомков в дереве.
    /// </summary>
    public long TreeDescendantCount { get; set; }

    /// <summary>
    /// Уровень в дереве.
    /// </summary>
    public long TreeLevel { get; set; }

    /// <summary>
    /// Путь в дереве.
    /// </summary>
    public string? TreePath { get; set; }

    /// <summary>
    /// Позиция в дереве.
    /// </summary>
    public int TreePosition { get; set; }

    /// <summary>
    /// Сортировка в дереве.
    /// </summary>
    public string? TreeSort { get; set; }

    #endregion Properties
}
