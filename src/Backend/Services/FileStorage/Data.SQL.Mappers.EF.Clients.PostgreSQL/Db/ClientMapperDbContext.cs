// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;

/// <summary>
/// Контекст базы данных сопоставителя клиента.
/// </summary>
public class ClientMapperDbContext : DbContext
{
    #region Properties

    /// <summary>
    /// Тип "Статья".
    /// </summary>
    public DbSet<ClientMapperArticleTypeEntity> Article { get; set; }

    /// <summary>
    /// Тип "Тема".
    /// </summary>
    public DbSet<ClientMapperTopicTypeEntity> Topic { get; set; }

    #endregion Properties

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

        modelBuilder.HasPostgresExtension("ltree");

        var typesOptions = ClientTypesOptions.Instance;

        modelBuilder.ApplyConfiguration(new ClientMapperArticleTypeConfiguration(typesOptions));
        modelBuilder.ApplyConfiguration(new ClientMapperTopicTypeConfiguration(typesOptions));
    }

    #endregion Protected methods
}
