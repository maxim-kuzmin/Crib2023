// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Microsoft.EntityFrameworkCore.Storage;

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Mappers.EF.Setup;

/// <summary>
/// Сервис настройки сопоставителя.
/// </summary>
/// <typeparam name="TDbContext">Тип контекста базы данных.</typeparam>
public abstract class MapperSetupService<TDbContext> : ISetupService
    where TDbContext : DbContext
{
    #region Public methods

    /// <inheritdoc/>
    public abstract Task MigrateDatabase();

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
    /// Проверить, найден ли хоть один экземпляр сущности "Тема".
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <returns>Задача на проверку.</returns>
    protected abstract Task<bool> CheckIfAnyTopicNotFound(TDbContext dbContext);

    /// <summary>
    /// Создать тело статьи.
    /// </summary>
    /// <param name="index">Индекс статьи.</param>
    /// <returns>Тело статьи.</returns>
    protected static string CreateArticleBody(long index)
    {
        int wordCount = new Random(Guid.NewGuid().GetHashCode()).Next(100, 200);

        int lineCount = new Random(Guid.NewGuid().GetHashCode()).Next(10, 20);

        int lineSize = wordCount / lineCount;

        var wordIndexes = Enumerable.Range(0, wordCount);

        var words = new List<string>(wordIndexes.Count());

        int lineIndex = lineSize;

        foreach (int wordIndex in wordIndexes)
        {
            words.Add($"Body-{index}-{wordIndex} ");

            if (wordIndex == lineIndex)
            {
                words.Add("\n");

                lineIndex += lineSize;
            }
        }

        return string.Join(null, words).TrimEnd();
    }

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
    /// Получить идентификаторы экземпляров сущности "Тема".
    /// </summary>
    /// <returns>Идентификаторы.</returns>
    protected abstract IEnumerable<long> GetTestTopicIds();

    /// <summary>
    /// Засеять список экземпляров сущности "Статья".
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <param name="topicIds">Идентификаторы экземпляров сущности "Тема".</param>
    /// <returns>Задача на засеивание.</returns>
    protected abstract Task SeedTestArticleList(TDbContext dbContext, IEnumerable<long> topicIds);

    /// <summary>
    /// Засеять список экземпляров сущности "Тема".
    /// </summary>
    /// <param name="dbContext">Контекст базы данных.</param>
    /// <returns>Задача на засеивание.</returns>
    protected abstract Task SeedTestTopicList(TDbContext dbContext);

    #endregion Protected methods
}
