// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Db;

public class MapperDbManager : MapperDbManager<MapperDbContext>
{
    #region Constructors

    /// <summary>
    /// Контсруктор.
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <param name="resource">Ресурс.</param>
    public MapperDbManager(MapperDbContext dbContext, IMapperResource resource)
        : base(dbContext, resource)
    {
    }

    #endregion Constructors
}
