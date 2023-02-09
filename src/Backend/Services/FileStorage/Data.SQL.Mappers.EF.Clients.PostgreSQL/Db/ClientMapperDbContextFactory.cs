// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;

/// <summary>
/// Фабрика контекста базы данных сопоставителя клиента. Предназначена для выполнения команд dotnet ef, например:
/// dotnet ef migrations add InitialCreate --configuration Debug -- "строка подключения к базе данных"
/// dotnet ef database update --configuration Debug -- "строка подключения к базе данных"
/// </summary>
public class ClientMapperDbContextFactory : IMapperDbContextFactory, IDesignTimeDbContextFactory<ClientMapperDbContext>
{
    #region Properties

    private IDbContextFactory<ClientMapperDbContext>? DbContextFactory { get; }

    private IOptionsMonitor<OptionsOfCommonDataSQL>? DbSetupOptions { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор, необходимый для создания экземпляра, используемого в командах dotnet ef.
    /// </summary>
    public ClientMapperDbContextFactory()
    {
    }

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="dbContextFactory">Фабрика базы данных.</param>
    /// <param name="dbSetupOptions">Параметры настройки базы данных.</param>
    public ClientMapperDbContextFactory(
        IDbContextFactory<ClientMapperDbContext> dbContextFactory,
        IOptionsMonitor<OptionsOfCommonDataSQL> dbSetupOptions)
    {
        DbContextFactory = dbContextFactory;
        DbSetupOptions = dbSetupOptions;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Настроить.
    /// </summary>
    /// <param name="builder">Построитель.</param>        
    /// <param name="connectionString">Строка подключения.</param>
    /// <param name="settingOptions">Параметры настройки.</param>
    /// <param name="logger">Регистратор.</param>
    /// <param name="dbSetupOptions">Параметры настройки базы данных.</param>
    public static void Configure(
        DbContextOptionsBuilder builder,
        string? connectionString,
        ILogger<ClientMapperDbContextFactory>? logger,
        IOptionsMonitor<OptionsOfCommonDataSQL>? dbSetupOptions)
    {
        if (builder.IsConfigured)
        {
            return;
        }

        if (string.IsNullOrWhiteSpace(connectionString))
        {
            if (connectionString is null)
            {
                throw new ArgumentNullException(nameof(connectionString));
            }
            else
            {
                throw new NullOrWhiteSpaceStringVariableException<ClientMapperDbContextFactory>(nameof(connectionString));
            }
        }

        if (logger != null)
        {
            var currentDbSetupOptions = dbSetupOptions?.CurrentValue;

            if (currentDbSetupOptions != null)
            {
                builder.BuildLogging(logger, currentDbSetupOptions.LogLevel);
            }
        }

        builder.UseNpgsql(
            connectionString,
            b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().GetName().Name));
    }

    /// <inheritdoc/>
    public ClientMapperDbContext CreateDbContext(string[] args)
    {
        DbContextOptionsBuilder<ClientMapperDbContext> builder = new();

        string? connectionString = args.Length > 0 ? args[0] : null;

        Configure(builder, connectionString, null, null);

        return new ClientMapperDbContext(builder.Options);
    }

    /// <inheritdoc/>
    MapperDbContext IMapperDbContextFactory.CreateDbContext()
    {
        if (DbContextFactory is null)
        {
            throw new NullVariableException<ClientMapperDbContextFactory>(nameof(DbContextFactory));
        }

        if (DbSetupOptions is null)
        {
            throw new NullVariableException<ClientMapperDbContextFactory>(nameof(DbSetupOptions));
        }

        var result = DbContextFactory.CreateDbContext();

        var currentDbSetupOptions = DbSetupOptions.CurrentValue;

        int dbCommandTimeout = currentDbSetupOptions.DbCommandTimeout;

        result.Database.SetCommandTimeout(dbCommandTimeout > 0 ? dbCommandTimeout : 3600);

        return result;
    }

    #endregion Public methods
}

///// <summary>
///// Фабрика контекста базы данных сопоставителя клиента.
///// </summary>
//public class ClientMapperDbContextFactory : IDesignTimeDbContextFactory<ClientMapperDbContext>
//{

//    /// <inheritdoc/>
//    public ClientMapperDbContext CreateDbContext(string[] args)
//    {
//        var config = AppHelper.CreateConfiguration();

//        var optionsBuilder = new DbContextOptionsBuilder<ClientMapperDbContext>();

//        optionsBuilder.UseSqlServer(
//            config["ConnectionString"],
//            sqlServerOptionsAction: o => o.MigrationsAssembly(Assembly.GetExecutingAssembly().GetName().Name));

//        return new ClientMapperDbContext(optionsBuilder.Options);
//    }
//}
