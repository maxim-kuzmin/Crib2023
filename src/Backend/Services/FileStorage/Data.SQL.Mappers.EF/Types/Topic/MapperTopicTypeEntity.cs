// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Topic;

/// <summary>
/// Сущность типа "Тема" сопоставителя.
/// </summary>
public class MapperTopicTypeEntity : TopicTypeEntity
{
    #region Navigation properties

    /// <summary>
    /// Список экземпляров сущности "Статья".
    /// </summary>
    public List<MapperArticleTypeEntity> ArticleList { get; } = new();

    /// <summary>
    /// Список дочерних экземпляров сущности "Тема".
    /// </summary>
    public List<MapperTopicTypeEntity> TopicChildList { get; } = new();

    /// <summary>
    /// Родительский экземпляр сущности "Тема".
    /// </summary>
    public MapperTopicTypeEntity? TopicParent { get; set; }

    #endregion Navigation properties
}
