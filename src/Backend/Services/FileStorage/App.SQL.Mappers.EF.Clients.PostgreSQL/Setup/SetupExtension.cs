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
    /// <param name="appBuilder">Построитель приложения.</param>
    public static void AddAppModules(this WebApplicationBuilder appBuilder)
    {
        var configuration = appBuilder.Configuration;

        appBuilder.Services.AddAppModules(new AppModule[]
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
    /// <param name="app">Приложение.</param>
    /// <param name="appHandler">Обработчик приложения.</param>
    /// <returns>Задача на использование.</returns>
    public static async Task UseAppModules(this WebApplication app, AppHandler appHandler)
    {
        app.UseRequestLocalization(x => x.SetDefaultCulture(appHandler.CurrentLanguage)
            .AddSupportedCultures(appHandler.AvailableLanguages)
            .AddSupportedUICultures(appHandler.AvailableLanguages));

        var setupService = app.Services.GetRequiredService<ISetupService>();

        await setupService.MigrateDatabase().ConfigureAwait(false);

        await setupService.SeedTestData().ConfigureAwait(false);
    }

    #endregion Public methods
}
