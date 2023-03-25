// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domains.CatalogTopic.Setup;

/// <summary>
/// Модуль настройки приложения домена.
/// </summary>
public class CatalogTopicDomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ICatalogTopicDomainResource>(x => new CatalogTopicDomainResource(
            x.GetRequiredService<IStringLocalizer<CatalogTopicDomainResource>>()));

        services.AddTransient<ICatalogTopicDomainItemGetOperationHandler>(x => new CatalogTopicDomainItemGetOperationHandler(
            x.GetRequiredService<ICatalogTopicDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<CatalogTopicDomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));

        services.AddTransient<ICatalogTopicDomainListGetOperationHandler>(x => new CatalogTopicDomainListGetOperationHandler(
            x.GetRequiredService<ICatalogTopicDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<CatalogTopicDomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptions>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(CatalogTopicDomainItemGetOperationRequestHandler),
                typeof(CatalogTopicDomainListGetOperationRequestHandler),
                typeof(ICatalogTopicDomainItemGetOperationHandler),
                typeof(ICatalogTopicDomainListGetOperationHandler),
                typeof(ICatalogTopicDomainResource),
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
