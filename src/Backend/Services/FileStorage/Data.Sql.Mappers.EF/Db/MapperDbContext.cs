// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Db;

/// <summary>
/// Контекст базы данных сопоставителя.
/// </summary>
public abstract class MapperDbContext : DbContext
{
    #region Properties        

    /// <summary>
    /// Тип "Статья".
    /// </summary>
    public DbSet<MapperArticleTypeEntity> Article { get; set; }

    /// <summary>
    /// Тип "Тема".
    /// </summary>
    public DbSet<MapperTopicTypeEntity> Topic { get; set; }

    #endregion Properties

    #region Constructors

    /// <inheritdoc/>
    public MapperDbContext(DbContextOptions options)
        : base(options)
    {
    }

    #endregion Constructors
}
