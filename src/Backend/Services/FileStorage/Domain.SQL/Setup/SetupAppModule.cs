// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Setup;

/// <summary>
/// Модуль настройки приложения.
/// </summary>
public class SetupAppModule : AppModule
{
    #region Public methods

    /// <inheritdoc/>
    public sealed override void ConfigureServices(IServiceCollection services)
    {
        services.AddSingleton<IResource>(x => new Resource(
            x.GetRequiredService<IStringLocalizer<Resource>>()));
    }

    /// <inheritdoc/>
    public sealed override IEnumerable<Type> GetExports()
    {
        return new[]
            {
                typeof(IResource),
            };
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override IEnumerable<Type> GetImports()
    {
        return new[]
            {
                typeof(IStringLocalizer),
            };
    }

    #endregion Protected methods
}
