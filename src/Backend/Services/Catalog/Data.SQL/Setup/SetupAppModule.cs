// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Setup;

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
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(SetupOptions),
        };
    }

    #endregion Public methods
}
