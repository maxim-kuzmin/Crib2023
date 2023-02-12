// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Setup;

/// <summary>
/// Сервис настройки сопоставителя.
/// </summary>
/// <typeparam name="TDbContext">Тип контекста базы данных.</typeparam>
public abstract class MapperSetupService<TDbContext> : ISetupService
    where TDbContext : DbContext
{
    #region Public methods

    /// <inheritdoc/>
    public async Task MigrateDatabase()
    {
        using var dbContext = CreateDbContext();

        await dbContext.Database.MigrateAsync().ConfigureAwait(false);
    }

    /// <inheritdoc/>
    public async Task SeedTestData()
    {
        using var dbContext = CreateDbContext();

        using var transaction = await dbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

        bool isAnyTopicNotFound = await CheckIfAnyTopicNotFound(dbContext).ConfigureAwait(false);

        if (isAnyTopicNotFound)
        {
            await SeedTestTopicList(dbContext).ConfigureAwait(false);

            var topicIds = GetTestTopicIds();

            await SeedTestArticleList(dbContext, topicIds).ConfigureAwait(false);
        }

        await transaction.CommitAsync().ConfigureAwait(false);
    }

    #endregion Public methods

    #region Protected methods

    /// <summary>
    /// Проверить, найдена ли хоть одна тема.
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <returns>Задача на проверку.</returns>
    protected abstract Task<bool> CheckIfAnyTopicNotFound(TDbContext dbContext);

    /// <summary>
    /// Создать контекст базы данных.
    /// </summary>
    /// <returns>Контекст базы данных.</returns>
    protected abstract TDbContext CreateDbContext();

    /// <summary>
    /// Получить случайный индекс.
    /// </summary>
    /// <typeparam name="T">Тип элемента.</typeparam>
    /// <param name="items">Элементы.</param>
    /// <returns>Индекс.</returns>
    protected static int GetRandomIndex<T>(IEnumerable<T> items)
    {
        return new Random(Guid.NewGuid().GetHashCode()).Next(0, items.Count());
    }

    /// <summary>
    /// Получить идентификаторы тестовых тем.
    /// </summary>
    /// <returns>Идентификаторы.</returns>
    protected abstract IEnumerable<long> GetTestTopicIds();

    /// <summary>
    /// Засеять список тестовых статей.
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <returns>Задача на засеивание.</returns>
    protected abstract Task SeedTestArticleList(TDbContext dbContext, IEnumerable<long> topicIds);

    /// <summary>
    /// Засеять список тестовых тем.
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <returns>Задача на засеивание.</returns>
    protected abstract Task SeedTestTopicList(TDbContext dbContext);

    #endregion Protected methods
}
