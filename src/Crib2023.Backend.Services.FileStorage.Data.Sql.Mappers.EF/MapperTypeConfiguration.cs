// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF;

/// <summary>
/// Конфигурация типа сопоставителя.
/// </summary>
/// <typeparam name="TEntity">Тип сущности.</typeparam>
public abstract class MapperTypeConfiguration<TEntity> : MapperTypeConfiguration<TypesOptions, TEntity>
    where TEntity : class
{
    #region Constructors

    /// <inheritdoc/>
    public MapperTypeConfiguration(TypesOptions typesOptions)
        : base(typesOptions)
    {
    }

    #endregion Constructors
}
