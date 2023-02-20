// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Types.Topic;

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
    public string Name { get; set; } = "";

    /// <summary>
    /// Идентификатор родителя.
    /// </summary>
    public long? ParentId { get; set; }

    /// <summary>
    /// Глобальный идентификатор строки.
    /// </summary>
    public Guid RowGuid { get; set; } = Guid.NewGuid();

    #endregion Properties
}
