﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using System.Reflection.PortableExecutable;

namespace Crib2023.Backend.Services.FileStorage.App.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Fields

    private readonly IAppEnvironment _appEnvironment;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="appEnvironment">Окружение приложения.</param>
    public SetupAppModule(IAppEnvironment appEnvironment)
    {
        _appEnvironment = appEnvironment;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton(x => _appEnvironment);

        services.AddSingleton(x => new SetupService(
            x.GetRequiredService<IAppEnvironment>(),
            x.GetRequiredService<IRepeatService>(),
            x.GetRequiredService<ISetupServiceOfServiceDataSQL>()
            ));

        services.AddLocalization(x => x.ConfigureLocalization());

        services.AddMediatR(cfg =>
        {
            cfg.RegisterServicesFromAssemblyContaining<ModuleOfCommonDomain>()
                .RegisterServicesFromAssemblyContaining<ModuleOfCommonDomainSQLMappersEF>()
                .RegisterServicesFromAssemblyContaining<ModuleOfServiceDomainsArticle>()
                .RegisterServicesFromAssemblyContaining<ModuleOfServiceDomainsTopic>();
        });

        // Additional configuration is required to successfully run gRPC on macOS.
        // For instructions on how to configure Kestrel and gRPC clients on macOS, visit https://go.microsoft.com/fwlink/?linkid=2099682

        services.AddGrpc();
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(IAppEnvironment),
                typeof(IConfiguration),
                typeof(ILogger),
                typeof(IMediator),
                typeof(IStringLocalizer),
            };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
            {
                typeof(ArticleDomainItemGetOperationRequestHandler),
                typeof(ArticleDomainListGetOperationRequestHandler),
                typeof(IRepeatService),
                typeof(ISetupServiceOfServiceDataSQL),
                typeof(TopicDomainItemGetOperationRequestHandler),
                typeof(TopicDomainListGetOperationRequestHandler),
            };
    }

    #endregion Protected methods
}
