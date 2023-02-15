// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.App.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

/// <summary>
/// Сервис настройки.
/// </summary>
public class SetupService
{
    #region Fields

    private readonly IAppEnvironment _appEnvironment;

    private readonly IRepeater _repeater;

    private readonly ISetupServiceOfServiceDataSQL _dbSetupService;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <param name="repeater">Повторитель.</param>
    /// <param name="dbSetupService">Сервис настройки базы данных.</param>
    public SetupService(
        IAppEnvironment appEnvironment,
        IRepeater repeater,
        ISetupServiceOfServiceDataSQL dbSetupService)
    {
        _appEnvironment = appEnvironment;
        _repeater = repeater;
        _dbSetupService = dbSetupService;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Выполнить.
    /// </summary>
    /// <returns>Задача на выполнение.</returns>
    public Task Execute()
    {
        return _appEnvironment.IsRetryEnabledByOrchestrator
            ? UpdateDatabase()
            : _repeater.ExecuteAsync<NpgsqlException>(10, UpdateDatabase);
    }

    #endregion Public methods

    #region Private methods

    private async Task UpdateDatabase()
    {
        await _dbSetupService.MigrateDatabase().ConfigureAwait(false);

        await _dbSetupService.SeedTestData().ConfigureAwait(false);
    }

    #endregion Private methods
}
