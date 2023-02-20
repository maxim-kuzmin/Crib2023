// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;

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

    #region Public methods

    /// <summary>
    /// Мигрировать асинхронно.
    /// </summary>
    /// <returns>Задача на миграцию.</returns>
    public async Task MigrateAsync()
    {
        await Database.MigrateAsync().ConfigureAwait(false);

        using var connection = (NpgsqlConnection)Database.GetDbConnection();

        connection.Open();

        await connection.ReloadTypesAsync().ConfigureAwait(false);
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.HasPostgresExtension("ltree");

        var typesOptions = ClientTypesOptions.Instance;

        modelBuilder.HasSequence<long>(typesOptions.Topic.DbSequenceForId, typesOptions.Topic.DbSchema)
            .IncrementsBy(1);

        modelBuilder.ApplyConfiguration(new ClientMapperArticleTypeConfiguration(typesOptions));
        modelBuilder.ApplyConfiguration(new ClientMapperTopicTypeConfiguration(typesOptions));
    }

    #endregion Protected methods
}
