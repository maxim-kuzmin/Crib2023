// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;

/// <summary>
/// Расширение типа "Статья" сопоставителя клиента.
/// </summary>
public static class ClientMapperArticleTypeExtension
{
    #region Public methods

    /// <summary>
    /// Преобразовать в сущность сопоставителя клиента.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Сущность сопоставителя клиента.</returns>
    public static ClientMapperArticleTypeEntity ToMapperEntity(this ArticleTypeEntity entity)
    {
        ClientMapperArticleTypeEntity result = new();

        new ArticleTypeLoader(result).Load(entity);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя клиента.</param>
    /// <returns>Сущность.</returns>
    public static ArticleTypeEntity ToEntity(this ClientMapperArticleTypeEntity mapperEntity)
    {
        ArticleTypeLoader loader = new();

        loader.Load(mapperEntity);

        return loader.Target;
    }

    #endregion Public methods
}
