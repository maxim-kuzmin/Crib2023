// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.Sql.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Properties

    private IConfigurationSection ConfigurationSection { get; set; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="configurationSection">Раздел конфигурации.</param>
    public SetupAppModule(IConfigurationSection configurationSection)
    {
        ConfigurationSection = configurationSection;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.Configure<SetupOptions>(ConfigurationSection);
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
