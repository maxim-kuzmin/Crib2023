﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Microsoft.AspNetCore.Localization;
using Microsoft.Extensions.Options;

namespace Crib2023.Backend.Gateways.WebAPI.App.Setup;

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
            new ModuleOfGatewayApp(appEnvironment, configuration.GetRequiredSection("App:Gateway:App")),
            new ModuleOfGatewayDomain(configuration.GetRequiredSection("App:Gateway:Domain")),
            new ModuleOfGatewayDomainsCatalogArticle(),
            new ModuleOfGatewayDomainsCatalogTopic(),
        });
    }

    /// <summary>
    /// Использовать модули приложения.
    /// </summary>
    /// <param name="app">Приложение.</param>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <returns>Задача на использование.</returns>
    public static Task UseAppModules(this WebApplication app, IAppEnvironment appEnvironment)
    {
        var setupOptions = app.Services.GetRequiredService<IOptions<SetupOptions>>().Value;

        app.UseRequestLocalization(x =>
        {
            x.SetDefaultCulture(appEnvironment.DefaultCulture)
                .AddSupportedCultures(appEnvironment.SupportedCultures)
                .AddSupportedUICultures(appEnvironment.SupportedCultures);

            bool isQueryStringKeyForCultureSpecified = !string.IsNullOrWhiteSpace(setupOptions.QueryStringKeyForCulture);

            bool isQueryStringKeyForUICultureSpecified = !string.IsNullOrWhiteSpace(setupOptions.QueryStringKeyForUICulture);

            if (isQueryStringKeyForCultureSpecified || isQueryStringKeyForUICultureSpecified)
            {
                foreach (var provider in x.RequestCultureProviders)
                {
                    if (provider is QueryStringRequestCultureProvider queryStringProvider)
                    {
                        if (isQueryStringKeyForCultureSpecified)
                        {
                            queryStringProvider.QueryStringKey = setupOptions.QueryStringKeyForCulture;
                        }
                        
                        if (isQueryStringKeyForUICultureSpecified)
                        {
                            queryStringProvider.UIQueryStringKey = setupOptions.QueryStringKeyForUICulture;
                        }                        
                    }
                }
            }
        });

        app.UseRouting();        

        if (setupOptions.CorsPolicyIsEnabled)
        {
            app.UseCors();
        }

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger(options =>
            {
                options.RouteTemplate = "api/swagger/{documentName}/swagger.json";
            });

            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = "api/swagger";
                c.SwaggerEndpoint("/api/swagger/v1/swagger.json", "My API V1");
            });
        }

        app.UseAuthorization();

        app.MapControllers();

        return Task.CompletedTask;
    }

    #endregion Public methods
}
