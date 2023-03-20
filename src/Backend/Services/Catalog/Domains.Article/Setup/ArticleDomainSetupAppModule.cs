// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Setup;

/// <summary>
/// Модуль настройки приложения домена.
/// </summary>
public class ArticleDomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IArticleDomainResource>(x => new ArticleDomainResource(
            x.GetRequiredService<IStringLocalizer<ArticleDomainResource>>()));

        services.AddTransient<IArticleRepository>(x => new ArticleDomainRepository(
            x.GetRequiredService<IClientMapperDbContextFactory>(),
            x.GetRequiredService<ClientMapperDbManager>(),
            x.GetRequiredService<IMediator>()
            ));

        services.AddTransient<IArticleItemGetOperationHandler>(x => new ArticleDomainItemGetOperationHandler(
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<IResourceOfServiceDomainSQL>(),
            x.GetRequiredService<IArticleDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<ArticleDomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<IArticleListGetOperationHandler>(x => new ArticleDomainListGetOperationHandler(
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<IArticleDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<ArticleDomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(ArticleDomainItemGetOperationRequestHandler),
            typeof(ArticleDomainListGetOperationRequestHandler),
            typeof(IArticleDomainResource),
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
                typeof(IOperationResource),
                typeof(IOperationsResource),
                typeof(IResourceOfServiceDomainSQL),
                typeof(IStringLocalizer),
                typeof(SetupOptionsOfCommonCore),
            };
    }

    #endregion Protected methods
}
