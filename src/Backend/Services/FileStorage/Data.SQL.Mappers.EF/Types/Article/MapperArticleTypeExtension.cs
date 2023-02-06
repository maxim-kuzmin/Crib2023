// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Article;

/// <summary>
/// Расширение типа "Статья" сопоставителя.
/// </summary>
public static class MapperArticleTypeExtension
{
    #region Public methods

    /// <summary>
    /// Преобразовать в сущность сопоставителя.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Сущность сопоставителя.</returns>
    public static MapperArticleTypeEntity ToMapperEntity(this ArticleTypeEntity entity)
    {
        MapperArticleTypeEntity result = new();

        new ArticleTypeLoader(result).Load(entity);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя.</param>
    /// <returns>Сущность.</returns>
    public static ArticleTypeEntity ToEntity(this MapperArticleTypeEntity mapperEntity)
    {
        ArticleTypeLoader loader = new();

        loader.Load(mapperEntity);

        return loader.Target;
    }

    #endregion Public methods
}
