﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Db;
using Crib2023.Backend.Services.FileStorage.Data.SQL.Setup;
using Makc2023.Backend.Common.Core;
using Npgsql;
using Polly;

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
    /// <param name="appEnvironment">Окружение приложения.</param>
    public static void AddAppModules(this WebApplicationBuilder appBuilder, IAppEnvironment appEnvironment)
    {
        var configuration = appBuilder.Configuration;

        appBuilder.Services.AddAppModules(new AppModule[]
        {
            new ModuleOfCommonCore(configuration.GetRequiredSection("App:Common:Core")),
            new ModuleOfCommonDataSQL(configuration.GetRequiredSection("App:Common:Data:SQL")),
            new ModuleOfCommonDataSQLClientsPostgreSQL(),
            new ModuleOfCommonDataSQLMappersEF(),
            new ModuleOfServiceApp(appEnvironment),
            new ModuleOfServiceDataSQLClientsPostgreSQL(),
            new ModuleOfServiceDataSQL(configuration.GetRequiredSection("App:Service:Data:SQL")),
            new ModuleOfServiceDataSQLMappersEFClientsPostgreSQL(),
            new ModuleOfServiceDomainsArticle(),
            new ModuleOfServiceDomainsTopic(),
        });
    }

    /// <summary>
    /// Использовать модули приложения.
    /// </summary>
    /// <param name="app">Приложение.</param>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <returns>Задача на использование.</returns>
    public static async Task UseAppModules(this WebApplication app, IAppEnvironment appEnvironment)
    {
        app.UseRequestLocalization(x => x.SetDefaultCulture(appEnvironment.DefaultCulture)
            .AddSupportedCultures(appEnvironment.SupportedCultures)
            .AddSupportedUICultures(appEnvironment.SupportedCultures));

        var setupService = app.Services.GetRequiredService<SetupService>();

        await setupService.Execute().ConfigureAwait(false);
    }

    #endregion Public methods
}
