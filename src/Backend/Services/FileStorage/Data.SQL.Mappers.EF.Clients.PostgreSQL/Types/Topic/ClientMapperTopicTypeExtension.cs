// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic;

/// <summary>
/// Расширение сущности "Тема" сопоставителя клиента.
/// </summary>
public static class ClientMapperTopicTypeExtension
{
    #region Public methods

    /// <summary>
    /// Преобразовать в сущность сопоставителя.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Сущность сопоставителя.</returns>
    public static ClientMapperTopicTypeEntity ToMapperEntity(this TopicTypeEntity entity)
    {
        ClientMapperTopicTypeEntity result = new();

        new TopicTypeLoader(result).Load(entity);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя.</param>
    /// <returns>Сущность.</returns>
    public static TopicTypeEntity ToEntity(this ClientMapperTopicTypeEntity mapperEntity)
    {
        TopicTypeLoader loader = new();

        loader.Load(mapperEntity);

        return loader.Target;
    }

    #endregion Public methods
}
