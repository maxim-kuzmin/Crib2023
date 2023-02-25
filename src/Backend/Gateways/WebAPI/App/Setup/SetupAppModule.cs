﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Core.Operation;

namespace Crib2023.Backend.Gateways.WebAPI.App.Setup;

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

        services.AddLocalization(x => x.ConfigureLocalization());

        services.AddMediatR(
            typeof(ModuleOfCommonDomain),
            typeof(ModuleOfGatewayDomainsCatalogArticle),
            typeof(ModuleOfGatewayDomainsCatalogTopic));
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
                typeof(RequestHandlerOfGatewayDomainsCatalogArticleOperationsItemGet),
                typeof(RequestHandlerOfGatewayDomainsCatalogArticleOperationsListGet),
                typeof(RequestHandlerOfGatewayDomainsCatalogTopicOperationsItemGet),
                typeof(RequestHandlerOfGatewayDomainsCatalogTopicOperationsListGet),
            };
    }

    #endregion Protected methods
}
