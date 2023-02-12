// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;

/// <summary>
/// Расширение типа "Статья" сопоставителя.
/// </summary>
public static class ClientMapperArticleTypeExtension
{
    #region Public methods

    /// <summary>
    /// Преобразовать в сущность сопоставителя.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Сущность сопоставителя.</returns>
    public static ClientMapperArticleTypeEntity ToMapperEntity(this ArticleTypeEntity entity)
    {
        ClientMapperArticleTypeEntity result = new();

        new ArticleTypeLoader(result).Load(entity);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя.</param>
    /// <returns>Сущность.</returns>
    public static ArticleTypeEntity ToEntity(this ClientMapperArticleTypeEntity mapperEntity)
    {
        ArticleTypeLoader loader = new();

        loader.Load(mapperEntity);

        return loader.Target;
    }

    #endregion Public methods
}
