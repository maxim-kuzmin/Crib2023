// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogArticle.Setup;

/// <summary>
/// Модуль настройки приложения домена.
/// </summary>
public class CatalogArticleDomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ICatalogArticleDomainResource>(x => new CatalogArticleDomainResource(
            x.GetRequiredService<IStringLocalizer<CatalogArticleDomainResource>>()));

        services.AddTransient<ICatalogArticleDomainItemDeleteOperationHandler>(x => new CatalogArticleDomainItemDeleteOperationHandler(
            x.GetRequiredService<ICatalogArticleDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<CatalogArticleDomainItemDeleteOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));

        services.AddTransient<ICatalogArticleDomainItemGetOperationHandler>(x => new CatalogArticleDomainItemGetOperationHandler(
            x.GetRequiredService<ICatalogArticleDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<CatalogArticleDomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));

        services.AddTransient<ICatalogArticleDomainItemSaveOperationHandler>(x => new CatalogArticleDomainItemSaveOperationHandler(
            x.GetRequiredService<ICatalogArticleDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<CatalogArticleDomainItemSaveOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));

        services.AddTransient<ICatalogArticleDomainListGetOperationHandler>(x => new CatalogArticleDomainListGetOperationHandler(
            x.GetRequiredService<ICatalogArticleDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<CatalogArticleDomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(CatalogArticleDomainItemDeleteOperationRequestHandler),
                typeof(CatalogArticleDomainItemGetOperationRequestHandler),
                typeof(CatalogArticleDomainItemSaveOperationRequestHandler),
                typeof(CatalogArticleDomainListGetOperationRequestHandler),
                typeof(ICatalogArticleDomainItemGetOperationHandler),
                typeof(ICatalogArticleDomainListGetOperationHandler),            
                typeof(ICatalogArticleDomainResource),
            };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
            {            
                typeof(ILogger),
                typeof(IMediator),
                typeof(IOperationResource),
                typeof(IStringLocalizer),
                typeof(SetupOptions),            
            };
    }

    #endregion Protected methods
}
