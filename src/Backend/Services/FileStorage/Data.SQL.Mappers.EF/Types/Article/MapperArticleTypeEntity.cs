// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Article;

/// <summary>
/// Сущность типа "Статья" сопоставителя.
/// </summary>
public class MapperArticleTypeEntity : ArticleTypeEntity
{
    #region Navigation properties

    /// <summary>
    /// Экземпляр сущности "Тема".
    /// </summary>
    public MapperTopicTypeEntity? Topic { get; set; }

    #endregion Navigation properties
}
