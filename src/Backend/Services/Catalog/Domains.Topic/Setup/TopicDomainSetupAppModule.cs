// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Setup;

/// <summary>
/// Модуль настройки приложения домена.
/// </summary>
public class TopicDomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ITopicDomainResource>(x => new TopicDomainResource(
            x.GetRequiredService<IStringLocalizer<TopicDomainResource>>()));

        services.AddTransient<ITopicRepository>(x => new TopicDomainRepository(
            x.GetRequiredService<IClientMapperDbContextFactory>(),
            x.GetRequiredService<ClientMapperDbManager>(),
            x.GetRequiredService<IMediator>()
            ));

        services.AddTransient<ITopicItemGetOperationHandler>(x => new TopicDomainItemGetOperationHandler(
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<IResourceOfServiceDomainSQL>(),
            x.GetRequiredService<ITopicDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<TopicDomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<ITopicListGetOperationHandler>(x => new TopicDomainListGetOperationHandler(
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<ITopicDomainResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<TopicDomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(TopicDomainItemGetOperationRequestHandler),
            typeof(TopicDomainListGetOperationRequestHandler),
            typeof(ITopicDomainResource),
            typeof(ITopicItemGetOperationHandler),
            typeof(ITopicListGetOperationHandler),
            typeof(ITopicRepository),
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
