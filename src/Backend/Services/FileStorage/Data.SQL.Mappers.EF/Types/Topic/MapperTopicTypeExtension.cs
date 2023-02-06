// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Types.Topic;

/// <summary>
/// Расширение сущности "Тема" сопоставителя.
/// </summary>
public static class MapperTopicTypeExtension
{
    #region Public methods

    /// <summary>
    /// Преобразовать в сущность сопоставителя.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Сущность сопоставителя.</returns>
    public static MapperTopicTypeEntity ToMapperEntity(this TopicTypeEntity entity)
    {
        MapperTopicTypeEntity result = new();

        new TopicTypeLoader(result).Load(entity);

        return result;
    }

    /// <summary>
    /// Преобразовать в сущность.
    /// </summary>
    /// <param name="mapperEntity">Сущность сопоставителя.</param>
    /// <returns>Сущность.</returns>
    public static TopicTypeEntity ToEntity(this MapperTopicTypeEntity mapperEntity)
    {
        TopicTypeLoader loader = new();

        loader.Load(mapperEntity);

        return loader.Target;
    }

    #endregion Public methods
}
