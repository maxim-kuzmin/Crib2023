﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

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
            x.GetRequiredService<IResourceOfCommonDataSQL>(),
            x.GetRequiredService<IResourceOfServiceDomainSQL>(),
            x.GetRequiredService<IDomainResource>(),
            x.GetRequiredService<IResourceOfCommonCoreOperation>(),
            x.GetRequiredService<ILogger<DomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<IArticleListGetOperationHandler>(x => new DomainListGetOperationHandler(
            x.GetRequiredService<IResourceOfCommonDataSQL>(),
            x.GetRequiredService<IDomainResource>(),
            x.GetRequiredService<IResourceOfCommonCoreOperation>(),
            x.GetRequiredService<ILogger<DomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(DomainItemGetOperationRequestHandler),
            typeof(DomainListGetOperationRequestHandler),
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
                typeof(IResourceOfCommonCoreOperation),
                typeof(IResourceOfCommonDataSQL),
                typeof(IResourceOfServiceDomainSQL),
                typeof(IStringLocalizer),
                typeof(SetupOptionsOfCommonCore),
            };
    }

    #endregion Protected methods
}
