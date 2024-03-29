﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Setup;

/// <summary>
/// Модуль настройки приложения домена "Статья".
/// </summary>
public class ArticleDomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IArticleDomainResource>(x => new ArticleDomainResource(
            x.GetRequiredService<IStringLocalizer<ArticleDomainResource>>()));

        services.AddTransient<IArticleDomainRepository>(x => new ArticleDomainRepository(
            x.GetRequiredService<IClientMapperDbContextFactory>(),
            x.GetRequiredService<ClientMapperDbManager>(),
            x.GetRequiredService<IMediator>()));

        services.AddTransient<IArticleDomainItemDeleteOperationHandler>(x => new ArticleDomainItemDeleteOperationHandler(
            x.GetRequiredService<IArticleDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<ArticleDomainItemDeleteOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<IArticleDomainItemGetOperationHandler>(x => new ArticleDomainItemGetOperationHandler(
            x.GetRequiredService<IArticleDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),                        
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<ArticleDomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<IArticleDomainItemSaveOperationHandler>(x => new ArticleDomainItemSaveOperationHandler(
            x.GetRequiredService<IArticleDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<ArticleDomainItemSaveOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<IArticleDomainListGetOperationHandler>(x => new ArticleDomainListGetOperationHandler(
            x.GetRequiredService<IArticleDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),            
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<ArticleDomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(ArticleDomainItemDeleteOperationRequestHandler),
                typeof(ArticleDomainItemGetOperationRequestHandler),
                typeof(ArticleDomainItemSaveOperationRequestHandler),
                typeof(ArticleDomainListGetOperationRequestHandler),
                typeof(IArticleDomainResource),
                typeof(IArticleDomainItemGetOperationHandler),
                typeof(IArticleDomainListGetOperationHandler),
                typeof(IArticleDomainRepository),
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
                typeof(IOperationResource),
                typeof(IOperationsResource),
                typeof(IStringLocalizer),
                typeof(SetupOptionsOfCommonCore),
            };
    }

    #endregion Protected methods
}
