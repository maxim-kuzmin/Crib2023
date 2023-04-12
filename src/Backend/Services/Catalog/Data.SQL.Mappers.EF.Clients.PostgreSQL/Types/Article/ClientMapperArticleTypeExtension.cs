// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;

/// <summary>
/// Расширение типа "Статья" сопоставителя клиента.
/// </summary>
public static class ClientMapperArticleTypeExtension
{
    #region Public methods

    /// <summary>
    /// Слить с сущностью.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя.</param>
    /// <param name="entity">Сущность.</param>
    /// <param name="loadableProperties">Загружаемые свойства.</param>
    /// <returns>Сущность сопоставителя клиента.</returns>
    public static void MergeWithEntity(
        this ClientMapperArticleTypeEntity mapperEntity,
        ArticleTypeEntity entity,
        HashSet<string>? loadableProperties = null)
    {
        new ArticleTypeLoader(mapperEntity).Load(entity, loadableProperties);
    }

    /// <summary>
    /// Преобразовать в сущность сопоставителя клиента.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <param name="loadableProperties">Загружаемые свойства.</param>
    /// <returns>Сущность сопоставителя клиента.</returns>
    public static ClientMapperArticleTypeEntity ToMapperEntity(
        this ArticleTypeEntity entity,
        HashSet<string>? loadableProperties = null)
    {
        ClientMapperArticleTypeEntity result = new();

        new ArticleTypeLoader(result).Load(entity, loadableProperties);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя клиента.</param>
    /// <param name="loadableProperties">Загружаемые свойства.</param>
    /// <returns>Сущность.</returns>
    public static ArticleTypeEntity ToEntity(
        this ClientMapperArticleTypeEntity mapperEntity,
        HashSet<string>? loadableProperties = null)
    {
        ArticleTypeLoader loader = new();

        loader.Load(mapperEntity, loadableProperties);

        return loader.Target;
    }

    #endregion Public methods
}
