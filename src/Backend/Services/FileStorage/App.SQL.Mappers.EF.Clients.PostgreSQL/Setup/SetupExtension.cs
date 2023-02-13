// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

/// <summary>
/// Расширение настройки.
/// </summary>
public static class SetupExtension
{
    #region Public methods

    /// <summary>
    /// Добавить модули приложения.
    /// </summary>
    /// <param name="services">Сервисы.</param>
    /// <param name="configuration">Конфигурация.</param>
    public static void AddAppModules(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAppModules(new AppModule[]
        {
            new ModuleOfCommonCore(configuration.GetRequiredSection("App:Common:Core")),
            new ModuleOfCommonDataSQL(configuration.GetRequiredSection("App:Common:Data:SQL")),
            new ModuleOfCommonDataSQLClientsPostgreSQL(),
            new ModuleOfCommonDataSQLMappersEF(),
            new ModuleOfServiceDataSQLClientsPostgreSQL(),
            new ModuleOfServiceDataSQL(configuration.GetRequiredSection($"App:Service:Data:SQL")),
            new ModuleOfServiceDataSQLMappersEFClientsPostgreSQL(),
            new ModuleOfServiceDomainsArticle()
        });
    }

    /// <summary>
    /// Использовать модули приложения.
    /// </summary>
    /// <param name="services">Сервисы.</param>
    /// <returns>Задача на использование.</returns>
    public static async Task UseAppModules(this IServiceProvider services)
    {
        var setupService = services.GetRequiredService<ISetupService>();

        await setupService.MigrateDatabase().ConfigureAwait(false);

        await setupService.SeedTestData().ConfigureAwait(false);
    }

    #endregion Public methods
}
