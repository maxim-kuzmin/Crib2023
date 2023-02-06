// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;

/// <summary>
/// Контекст базы данных сопоставителя клиента.
/// </summary>
public class ClientMapperDbContext : MapperDbContext
{
    #region Constructors

    /// <inheritdoc/>
    public ClientMapperDbContext(DbContextOptions<ClientMapperDbContext> options)
        : base(options)
    {
    }

    #endregion Constructors

    #region Protected methods

    /// <inheritdoc/>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var typesOptions = ClientTypesOptions.Instance;

        modelBuilder.ApplyConfiguration(new MapperArticleTypeConfiguration(typesOptions));
        modelBuilder.ApplyConfiguration(new MapperTopicTypeConfiguration(typesOptions));
    }

    #endregion Protected methods
}
