// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Microsoft.Extensions.Options;

namespace Crib2023.Backend.Gateways.WebAPI.App.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Fields

    private readonly IAppEnvironment _appEnvironment;

    private readonly IConfigurationSection _configurationSection;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <param name="configurationSection">Раздел конфигурации.</param>
    public SetupAppModule(IAppEnvironment appEnvironment, IConfigurationSection configurationSection)
    {
        _appEnvironment = appEnvironment;
        _configurationSection = configurationSection;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton(x => _appEnvironment);

        services.AddLocalization(x => x.ConfigureLocalization());

        services.Configure<SetupOptions>(_configurationSection);

       services.AddGrpcClient<ArticleGrpcProto.ArticleGrpcProtoClient>((services, options) =>
       {
           string url = services.GetRequiredService<IOptions<SetupOptions>>().Value.FileStorageUrl;

           options.Address = new Uri(url);
       });
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(IAppEnvironment),
                typeof(IConfiguration),
                typeof(ILogger),
                typeof(IStringLocalizer),
                typeof(SetupOptions),
            };
    }

    #endregion Public methods
}
