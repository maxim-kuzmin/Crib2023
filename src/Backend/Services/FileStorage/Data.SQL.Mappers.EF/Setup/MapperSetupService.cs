// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Setup;

/// <summary>
/// Сервис настройки сопоставителя.
/// </summary>
public class MapperSetupService : ISetupService
{
    #region Properties

    private IProvider ClientProvider { get; }

    private TypesOptions EntitiesOptions { get; }

    private IMapperDbContextFactory MapperDbFactory { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>        
    /// <param name="сlientProvider">Поставщик клиента.</param>
    /// <param name="typesOptions">Параметры сущностей.</param>        
    /// <param name="mapperDbFactory">Фабрика базы данных сопоставителя.</param>
    public MapperSetupService(
        IProvider сlientProvider,
        TypesOptions typesOptions,
        IMapperDbContextFactory mapperDbFactory
        )
    {
        ClientProvider = сlientProvider;
        EntitiesOptions = typesOptions;
        MapperDbFactory = mapperDbFactory;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task MigrateDatabase()
    {
        using var dbContext = MapperDbFactory.CreateDbContext();

        await dbContext.Database.MigrateAsync().ConfigureAwait(false);
    }

    /// <inheritdoc/>
    public async Task SeedTestData()
    {
        using var dbContext = MapperDbFactory.CreateDbContext();

        using var transaction = await dbContext.Database.BeginTransactionAsync().ConfigureAwait(false);

        bool isOk = await dbContext.Topic.AnyAsync().ConfigureAwait(false);

        if (!isOk)
        {
            var topicList = await SeedTestTopicList(dbContext).ConfigureAwait(false);

            var articleList = await SeedTestArticleList(dbContext, topicList).ConfigureAwait(false);
        }

        await transaction.CommitAsync().ConfigureAwait(false);
    }

    #endregion Public methods

    #region Private methods

    private static MapperArticleTypeEntity CreateTestArticle(
        long index,
        IEnumerable<MapperTopicTypeEntity> topicList)
    {
        int topicIndex = GetRandomIndex(topicList);

        return new MapperArticleTypeEntity
        {
            Hash = $"Hash-{index}",
            Path = $"Path-{index}",
            Title = $"Title-{index}",
            TopicId = topicList.ElementAt(topicIndex).Id
        };
    }

    private static MapperTopicTypeEntity CreateTestTopic(
        IEnumerable<int> indexes,
        long? parentId)
    {
        string suffix = indexes.Any() ? "-" + string.Join("-", indexes) : string.Empty;

        return new MapperTopicTypeEntity
        {
            Name = $"Name{suffix}",
            ParentId = parentId
        };
    }

    private static int GetRandomIndex<T>(IEnumerable<T> items)
    {
        return new Random(Guid.NewGuid().GetHashCode()).Next(0, items.Count());
    }

    private async Task SaveTestTopicList(
        MapperDbContext dbContext,
        List<MapperTopicTypeEntity> topicList,
        List<int> parentIndexes,
        long? parentId)
    {
        if (parentIndexes.Count == 5)
        {
            return;
        }

        var indexes = new List<int>();

        if (parentIndexes.Any())
        {
            indexes.AddRange(parentIndexes);
        }

        for (int index = 1; index < 4; index++)
        {
            indexes.Add(index);

            var topic = CreateTestTopic(indexes, parentId);

            topicList.Add(topic);

            dbContext.Topic.Add(topic);

            await dbContext.SaveChangesAsync().ConfigureAwait(false);

            await SaveTestTopicList(dbContext, topicList, indexes, topic.Id).ConfigureAwait(false);

            indexes.RemoveAt(indexes.Count - 1);
        }
    }

    private static async Task<IEnumerable<MapperArticleTypeEntity>> SeedTestArticleList(
        MapperDbContext dbContext,
        IEnumerable<MapperTopicTypeEntity> topicList)
    {
        var result = Enumerable.Range(1, 100)
            .Select(index => CreateTestArticle(index, topicList))
            .ToArray();

        dbContext.Article.AddRange(result);

        await dbContext.SaveChangesAsync().ConfigureAwait(false);

        return result;
    }

    private async Task<IEnumerable<MapperTopicTypeEntity>> SeedTestTopicList(
        MapperDbContext dbContext)
    {
        var result = new List<MapperTopicTypeEntity>();

        await SaveTestTopicList(dbContext, result, new List<int>(), null).ConfigureAwait(false);

        return result;
    }

    #endregion Private methods
}
