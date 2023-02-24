﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

/// <summary>
/// Модуль настройки приложения домена.
/// </summary>
public class DomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IDomainResource>(x => new DomainResource(
            x.GetRequiredService<IStringLocalizer<DomainResource>>()));

        services.AddTransient<IArticleRepository>(x => new DomainRepository(
            x.GetRequiredService<IClientMapperDbContextFactory>(),
            x.GetRequiredService<ClientMapperDbManager>(),
            x.GetRequiredService<IMediator>()
            ));

        services.AddTransient<IArticleItemGetOperationHandler>(x => new DomainItemGetOperationHandler(
            x.GetRequiredService<IDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<DomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));

        services.AddTransient<IArticleListGetOperationHandler>(x => new DomainListGetOperationHandler(
            x.GetRequiredService<IDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<DomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(IDomainResource),
            typeof(IArticleItemGetOperationHandler),
            typeof(IArticleListGetOperationHandler),
            typeof(IArticleRepository),
        };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
        {
            typeof(ClientMapperDbManager),            
            typeof(IClientMapperDbContextFactory),
            typeof(ILogger),
            typeof(IMediator),
            typeof(IStringLocalizer),
            typeof(SetupOptions),
        };
    }

    #endregion Protected methods
}