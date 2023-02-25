// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.Domain.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Fields

    private readonly IConfigurationSection _configurationSection;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="configurationSection">Раздел конфигурации.</param>
    public SetupAppModule(IConfigurationSection configurationSection)
    {
        _configurationSection = configurationSection;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.Configure<SetupOptions>(_configurationSection);

        services.AddGrpcClient<GrpcClientOfCatalogArticle>((services, options) =>
        {
            string url = services.GetRequiredService<IOptions<SetupOptions>>().Value.CatalogUrl;

            options.Address = new Uri(url);
        });

        services.AddGrpcClient<GrpcClientOfCatalogTopic>((services, options) =>
        {
            string url = services.GetRequiredService<IOptions<SetupOptions>>().Value.CatalogUrl;

            options.Address = new Uri(url);
        });

        services.AddGrpcClient<GrpcClientOfFileStorageArticle>((services, options) =>
        {
            string url = services.GetRequiredService<IOptions<SetupOptions>>().Value.FileStorageUrl;

            options.Address = new Uri(url);
        });

        services.AddGrpcClient<GrpcClientOfFileStorageTopic>((services, options) =>
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
                typeof(GrpcClientOfCatalogArticle),
                typeof(GrpcClientOfCatalogTopic),
                typeof(GrpcClientOfFileStorageArticle),
                typeof(GrpcClientOfFileStorageTopic),
                typeof(SetupOptions),
            };
    }

    #endregion Public methods
}
