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
    /// <param name="appEnvironment">Окружение приложения.</param>
    public static void AddAppModules(this WebApplicationBuilder appBuilder, IAppEnvironment appEnvironment)
    {
        appBuilder.Configure();

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

        // Additional configuration is required to successfully run gRPC on macOS.
        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

        appBuilder.Services.AddGrpc();
    }

    /// <summary>
    /// Использовать модули приложения.
    /// </summary>
    /// <param name="app">Приложение.</param>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <returns>Задача на использование.</returns>
    public static Task UseAppModules(this WebApplication app, IAppEnvironment appEnvironment)
    {
        app.UseRequestLocalization(x => x.SetDefaultCulture(appEnvironment.DefaultCulture)
            .AddSupportedCultures(appEnvironment.SupportedCultures)
            .AddSupportedUICultures(appEnvironment.SupportedCultures));

        app.MapGrpcService<ArticleGrpcService>();
        app.MapGrpcService<TopicGrpcService>();

        app.MapGet("/", () => "Communication with gRPC endpoints must be made through a gRPC client. To learn how to create a client, visit: https://go.microsoft.com/fwlink/?linkid=2086909");

        var setupService = app.Services.GetRequiredService<SetupService>();

        return setupService.Execute();
    }

    #endregion Public methods
}
