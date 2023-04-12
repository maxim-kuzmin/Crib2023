// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic;

/// <summary>
/// Расширение сущности "Тема" сопоставителя клиента.
/// </summary>
public static class ClientMapperTopicTypeExtension
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
        this ClientMapperTopicTypeEntity mapperEntity,
        TopicTypeEntity entity,
        HashSet<string>? loadableProperties = null)
    {
        new TopicTypeLoader(mapperEntity).Load(entity, loadableProperties);
    }

    /// <summary>
    /// Преобразовать в сущность сопоставителя клиента.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <param name="loadableProperties">Загружаемые свойства.</param>
    /// <returns>Сущность сопоставителя клиента.</returns>
    public static ClientMapperTopicTypeEntity ToMapperEntity(
        this TopicTypeEntity entity,
        HashSet<string>? loadableProperties = null)
    {
        ClientMapperTopicTypeEntity result = new();

        new TopicTypeLoader(result).Load(entity, loadableProperties);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя клиента.</param>
    /// <param name="loadableProperties">Загружаемые свойства.</param>
    /// <returns>Сущность.</returns>
    public static TopicTypeEntity ToEntity(
        this ClientMapperTopicTypeEntity mapperEntity,
        HashSet<string>? loadableProperties = null)
    {
        TopicTypeLoader loader = new();

        loader.Load(mapperEntity, loadableProperties);

        return loader.Target;
    }

    #endregion Public methods
}
