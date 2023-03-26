﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article;

/// <summary>
/// Репозиторий домена "Статья".
/// </summary>
public class ArticleDomainRepository : MapperRepository<ArticleDomainEntityForItem>, IArticleDomainRepository
{
    #region Properties

    private IClientMapperDbContextFactory DbContextFactory { get; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="dbContextFactory">Фабрика контекста базы данных.</param>
    /// <param name="dbManager">Менеджер базы данных.</param>
    /// <param name="mediator">Посредник.</param>
    public ArticleDomainRepository(
        IClientMapperDbContextFactory dbContextFactory,
        ClientMapperDbManager dbManager,
        IMediator mediator)
        : base(dbManager.DbContext, mediator)
    {
        DbContextFactory = dbContextFactory;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<ArticleDomainItemGetOperationOutput> GetItem(ArticleDomainItemGetOperationInput input)
    {
        ArticleDomainItemGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();

        var taskForItem = dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .SingleOrDefaultAsync();

        var mapperForItem = await taskForItem.ConfigureAwait(false);

        if (mapperForItem != null)
        {
            var item = new ArticleDomainEntityForItem(mapperForItem);

            await LoadTopicPathItems(dbContext, item, mapperForItem).ConfigureAwait(false);

            result.Item = item;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<ArticleDomainListGetOperationOutput> GetList(ArticleDomainListGetOperationInput input)
    {
        ArticleDomainListGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();
        using var dbContextForTotalCount = DbContextFactory.CreateDbContext();

        var queryForItems = dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .ApplySorting(input)
            .ApplyPagination(input);

        var queryForTotalCount = dbContextForTotalCount.Article
            .ApplyFiltering(input);

        var taskForItems = queryForItems.Select(x => new ItemForList(
            x.Id,
            x.RowGuid,
            x.Title,
            x.Topic,
            x.TopicId
        )).ToArrayAsync();

        var taskForTotalCount = queryForTotalCount.CountAsync();

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        var itemLookup = mapperForItems
            .Select(x => new ArticleDomainEntityForList(new ArticleTypeEntityForList
            {
                Id = x.Id,
                RowGuid = x.RowGuid,
                Title = x.Title,
                TopicId = x.TopicId
            }))
            .ToDictionary(x => x.Data.Id);

        await LoadTopicPathItemsForList(
            dbContext,
            itemLookup,
            mapperForItems).ConfigureAwait(false);

        result.Items = itemLookup.Values.ToArray();
        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static ClientMapperArticleTypeEntity CreateItemForList(ClientMapperArticleTypeEntity mapperForItem)
    {
        return new ClientMapperArticleTypeEntity
        {
            Id = mapperForItem.Id,
            RowGuid = mapperForItem.RowGuid,
            Title = mapperForItem.Title,
            Topic = mapperForItem.Topic,
            TopicId = mapperForItem.TopicId,
        };
    }

    private static async Task LoadTopicPathItems(
        ClientMapperDbContext dbContext,
        ArticleDomainEntityForItem item,
        ClientMapperArticleTypeEntity mapperForItem)
    {
        var mapperTopic = mapperForItem.Topic;

        long[] ancestorIds = mapperTopic.TreePath.ToString().FromTreePathToInt64ArrayOfAncestors();

        if (ancestorIds.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => ancestorIds.Contains(x.Id))
                .Select(x => new OptionValueObjectWithInt64Id(x.Id, x.Name))
                .ToDictionaryAsync(x => x.Id);

            var topicPathItemLookup = await taskForLookup.ConfigureAwait(false);

            foreach (long ancestorId in ancestorIds)
            {
                if (topicPathItemLookup.TryGetValue(ancestorId, out var option))
                {
                    item.AddTopicPathItem(option);
                }
            }
        }

        item.AddTopicPathItem(new OptionValueObjectWithInt64Id(mapperTopic.Id, mapperTopic.Name));
    }

    private static async Task LoadTopicPathItemsForList(
        ClientMapperDbContext dbContext,
        Dictionary<long, ArticleDomainEntityForList> itemLookup,
        IEnumerable<ItemForList> mapperForItems)
    {
        long[] ancestorIdsForLookup = mapperForItems
            .SelectMany(x => x.Topic.TreePath.ToString().FromTreePathToInt64ArrayOfAncestors())
            .Distinct()
            .ToArray();

        if (ancestorIdsForLookup.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => ancestorIdsForLookup.Contains(x.Id))
                .Select(x => new OptionValueObjectWithInt64Id(x.Id, x.Name))
                .ToDictionaryAsync(x => x.Id);

            var ancestorLookup = await taskForLookup.ConfigureAwait(false);

            foreach (var mapperForItem in mapperForItems)
            {
                if (itemLookup.TryGetValue(mapperForItem.Id, out var item))
                {
                    var mapperTopic = mapperForItem.Topic;

                    if (ancestorLookup.Any())
                    {
                        long[] ancestorIds = mapperTopic.TreePath.ToString()
                            .FromTreePathToInt64ArrayOfAncestors();

                        foreach (long ancestorId in ancestorIds)
                        {
                            if (ancestorLookup.TryGetValue(ancestorId, out var ancestor))
                            {
                                item.AddTopicPathItem(ancestor);
                            }
                        }
                    }

                    item.AddTopicPathItem(new OptionValueObjectWithInt64Id(mapperTopic.Id, mapperTopic.Name));
                }
            }
        }
    }

    #endregion Private methods

    private class ItemForList
    {
        public long Id { get; }

        public Guid RowGuid { get; }

        public string Title { get; }

        public ClientMapperTopicTypeEntity Topic { get; }

        public long TopicId { get; }

        public ItemForList(long id, Guid rowGuid, string title, ClientMapperTopicTypeEntity topic, long topicId)
        {
            Id = id;
            RowGuid = rowGuid;
            Title = title;
            Topic = topic;
            TopicId = topicId;
        }
    }
}
