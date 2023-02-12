// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

/// <summary>
/// Модуль настройки приложения сопоставителя клиента.
/// </summary>
public class ClientMapperSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddDbContext<ClientMapperDbContext>();

        services.AddDbContextFactory<ClientMapperDbContext>((x, options) => ClientMapperDbContextFactory.Configure(
            options,
            x.GetRequiredService<IConfiguration>().GetConnectionString(GetConnectionStringName(x)),
            x.GetRequiredService<ILogger<ClientMapperDbContextFactory>>(),
            x.GetRequiredService<IOptionsMonitor<OptionsOfCommonDataSQL>>()));

        services.AddScoped<IClientMapperDbContextFactory>(x => new ClientMapperDbContextFactory(
            x.GetRequiredService<IDbContextFactory<ClientMapperDbContext>>(),
            x.GetRequiredService<IOptionsMonitor<OptionsOfCommonDataSQL>>()));

        services.AddScoped(x => new ClientMapperDbManager(
            x.GetRequiredService<ClientMapperDbContext>(),
            x.GetRequiredService<IMapperResource>()
            ));

        services.AddScoped<IMapperDbManager, ClientMapperDbManager>();

        services.AddTransient<ISetupService>(x => new ClientMapperSetupService(
            x.GetRequiredService<IClientMapperDbContextFactory>()
            ));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(ClientMapperDbContext),                
                typeof(ClientMapperDbManager),
                typeof(IClientMapperDbContextFactory),
                typeof(IDbContextFactory<ClientMapperDbContext>),
                typeof(IMapperDbManager),
                typeof(ISetupService)
            };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
            {
                typeof(IConfiguration),
                typeof(ILogger),
                typeof(IMapperDbManager),
                typeof(IMapperResource),
                typeof(IProvider),
                typeof(OptionsOfCommonDataSQL),
                typeof(OptionsOfServiceDataSQL),
                typeof(TypesOptions),
            };
    }

    #endregion Protected methods

    #region Private methods

    private static string GetConnectionStringName(IServiceProvider serviceProvider)
    {
        string? result = serviceProvider.GetRequiredService<IOptions<OptionsOfServiceDataSQL>>()
            .Value
            .ConnectionStringName;

        if (string.IsNullOrWhiteSpace(result))
        {
            throw new NullOrWhiteSpaceStringVariableException<OptionsOfServiceDataSQL>
                (nameof(OptionsOfServiceDataSQL.ConnectionStringName));
        }

        return result;
    }

    #endregion Private methods
}