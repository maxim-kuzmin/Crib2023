// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Setup;

/// <summary>
/// Модуль настройки приложения домена "Тема".
/// </summary>
public class TopicDomainSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ITopicDomainResource>(x => new TopicDomainResource(
            x.GetRequiredService<IStringLocalizer<TopicDomainResource>>()));

        services.AddTransient<ITopicDomainRepository>(x => new TopicDomainRepository(
            x.GetRequiredService<IClientMapperDbContextFactory>(),
            x.GetRequiredService<ClientMapperDbManager>(),
            x.GetRequiredService<IMediator>()
            ));

        services.AddTransient<ITopicDomainItemGetOperationHandler>(x => new TopicDomainItemGetOperationHandler(
            x.GetRequiredService<ITopicDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),                        
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<TopicDomainItemGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<ITopicDomainListGetOperationHandler>(x => new TopicDomainListGetOperationHandler(
            x.GetRequiredService<ITopicDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),            
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<TopicDomainListGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));

        services.AddTransient<ITopicDomainTreeGetOperationHandler>(x => new TopicDomainTreeGetOperationHandler(
            x.GetRequiredService<ITopicDomainResource>(),
            x.GetRequiredService<IOperationsResource>(),
            x.GetRequiredService<IOperationResource>(),
            x.GetRequiredService<ILogger<TopicDomainTreeGetOperationHandler>>(),
            x.GetRequiredService<IOptionsMonitor<SetupOptionsOfCommonCore>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(TopicDomainItemGetOperationRequestHandler),
            typeof(TopicDomainListGetOperationRequestHandler),
            typeof(TopicDomainTreeGetOperationRequestHandler),
            typeof(ITopicDomainResource),
            typeof(ITopicDomainItemGetOperationHandler),
            typeof(ITopicDomainListGetOperationHandler),
            typeof(ITopicDomainRepository),
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
