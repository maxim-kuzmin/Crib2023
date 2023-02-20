// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.App.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

/// <summary>
/// Сервис настройки.
/// </summary>
public class SetupService
{
    #region Fields

    private readonly IAppEnvironment _appEnvironment;

    private readonly IRepeatService _repeatService;

    private readonly ISetupServiceOfServiceDataSQL _dbSetupService;

    #endregion Fields

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="appEnvironment">Окружение приложения.</param>
    /// <param name="repeatService">Сервис повторения.</param>
    /// <param name="dbSetupService">Сервис настройки базы данных.</param>
    public SetupService(
        IAppEnvironment appEnvironment,
        IRepeatService repeatService,
        ISetupServiceOfServiceDataSQL dbSetupService)
    {
        _appEnvironment = appEnvironment;
        _repeatService = repeatService;
        _dbSetupService = dbSetupService;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Выполнить.
    /// </summary>
    /// <returns>Задача на выполнение.</returns>
    public async Task Execute()
    {
        if (_appEnvironment.IsRetryEnabledByOrchestrator)
        {
            await _dbSetupService.MigrateDatabase().ConfigureAwait(false);

            await _dbSetupService.SeedTestData().ConfigureAwait(false);
        }
        else
        {
            const int retryCount = 10;

            static bool filterException(Exception ex) => ex is DbUpdateException || ex is NpgsqlException;

            var task = _repeatService.ExecuteAsync(retryCount, _dbSetupService.MigrateDatabase, filterException);

            await task.ConfigureAwait(false);

            task = _repeatService.ExecuteAsync(retryCount, _dbSetupService.SeedTestData, filterException);

            await task.ConfigureAwait(false);
        }
    }

    #endregion Public methods
}
