// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Data.SQL.Commands.Tree;

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Setup;

/// <summary>
/// Сервис настройки сопоставителя клиента.
/// </summary>
public class ClientMapperSetupService : MapperSetupService<ClientMapperDbContext>
{
    #region Fields

    private readonly IClientMapperDbContextFactory _dbContextFactory;

    #endregion Fields

    #region Properties

    private IEnumerable<ClientMapperArticleTypeEntity> ArticleList { get; set; } = null!;

    private IEnumerable<ClientMapperTopicTypeEntity> TopicList { get; set; } = null!;

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>        
    /// <param name="dbContextFactory">Фабрика контекста базы данных.</param>
    public ClientMapperSetupService(IClientMapperDbContextFactory dbContextFactory)
    {
        _dbContextFactory = dbContextFactory;
    }

    #endregion Constructors

    #region Protected methods

    /// <inheritdoc/>
    protected sealed override async Task<bool> CheckIfAnyTopicNotFound(ClientMapperDbContext dbContext)
    {
        bool isFound = await dbContext.Topic.AnyAsync().ConfigureAwait(false);

        return !isFound;
    }

    /// <inheritdoc/>
    protected sealed override ClientMapperDbContext CreateDbContext()
    {
        return _dbContextFactory.CreateDbContext();
    }

    /// <inheritdoc/>
    protected sealed override IEnumerable<long> GetTestTopicIds()
    {
        return TopicList.Select(x => x.Id);
    }

    /// <inheritdoc/>
    protected sealed override async Task SeedTestArticleList(
        ClientMapperDbContext dbContext,
        IEnumerable<long> topicIds)
    {
        ArticleList = Enumerable.Range(1, 100)
            .Select(index => CreateTestArticle(index, topicIds))
            .ToArray();

        dbContext.Article.AddRange(ArticleList);

        await dbContext.SaveChangesAsync().ConfigureAwait(false);
    }

    /// <inheritdoc/>
    protected sealed override async Task SeedTestTopicList(ClientMapperDbContext dbContext)
    {
        var result = new List<ClientMapperTopicTypeEntity>();

        await SaveTestTopicList(dbContext, result, new List<int>(), null).ConfigureAwait(false);

        TopicList = result;
    }

    #endregion Protected methods

    #region Private methods

    private static ClientMapperArticleTypeEntity CreateTestArticle(long index, IEnumerable<long> topicIds)
    {
        int topicIndex = GetRandomIndex(topicIds);

        return new ClientMapperArticleTypeEntity
        {
            Hash = $"Hash-{index}",
            Path = $"Path-{index}",
            Title = $"Title-{index}",
            TopicId = topicIds.ElementAt(topicIndex)
        };
    }

    private static ClientMapperTopicTypeEntity CreateTestTopic(
        IEnumerable<int> indexes,
        long? parentId)
    {
        string suffix = indexes.Any() ? "-" + string.Join("-", indexes) : string.Empty;

        return new ClientMapperTopicTypeEntity
        {
            Name = $"Name{suffix}",
            ParentId = parentId
        };
    }

    private async Task SaveTestTopicList(
        ClientMapperDbContext dbContext,
        List<ClientMapperTopicTypeEntity> topicList,
        List<int> parentIndexes,
        ClientMapperTopicTypeEntity parent)
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

            var topic = CreateTestTopic(indexes, parent?.Id);

            topicList.Add(topic);

            dbContext.Topic.Add(topic);

            topic.DbColumnForTreePath = new LTree(topic.Id.FromInt64ToTreePath(parent?.TreePath));

            await dbContext.SaveChangesAsync().ConfigureAwait(false);

            await SaveTestTopicList(dbContext, topicList, indexes, topic).ConfigureAwait(false);

            indexes.RemoveAt(indexes.Count - 1);
        }
    }

    #endregion Private methods
}
