// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.Sql.Mappers.EF.Setup;

/// <summary>
/// Модуль настройки приложения сопоставителя.
/// </summary>
public class MapperSetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<ISetupService>(x => new MapperSetupService(
            x.GetRequiredService<IProvider>(),
            x.GetRequiredService<TypesOptions>(),
            x.GetRequiredService<IMapperDbContextFactory>()
            ));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
        {
            typeof(ISetupService)
        };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
        {
            typeof(TypesOptions),
            typeof(IProvider),
            typeof(IMapperDbContextFactory),
        };
    }

    #endregion Protected methods
}
