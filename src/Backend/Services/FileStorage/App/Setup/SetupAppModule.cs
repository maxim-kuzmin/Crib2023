// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddLocalization(x => x.ConfigureLocalization());

        services.AddMediatR(
            typeof(ModuleOfCommonDomain),
            typeof(ModuleOfCommonDomainSqlMappersEF),
            typeof(ModuleOfServiceDomainsArticle));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {            
            typeof(IConfiguration),
            typeof(ILogger),
            typeof(IMediator),
            typeof(IStringLocalizer),
        };
    }

    #endregion Public methods
}
