﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article;

/// <summary>
/// Репозиторий домена "Статья".
/// </summary>
public class ArticleDomainRepository : MapperRepository<ArticleDomainEntityForItem>, IArticleDomainRepository
{
    #region Fields

    private readonly IClientMapperDbContextFactory _dbContextFactory;

    #endregion Fields

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
        _dbContextFactory = dbContextFactory;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task DeleteItem(ArticleDomainItemGetOperationInput input)
    {
        using var dbContext = _dbContextFactory.CreateDbContext();

        var predicate = input.CreatePredicate();

        var task = dbContext.Article.Where(predicate).SingleOrDefaultAsync();

        var mapperEntity = await task.ConfigureAwait(false);

        if (mapperEntity != null)
        {
            dbContext.Article.Remove(mapperEntity);

            await dbContext.SaveChangesAsync().ConfigureAwait(false);
        }
    }

    /// <inheritdoc/>
    public async Task<ArticleDomainItemGetOperationOutput> GetItem(ArticleDomainItemGetOperationInput input)
    {
        ArticleDomainItemGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        var predicate = input.CreatePredicate();

        var taskForItem = dbContext.Article
            .Include(x => x.Topic)
            .Where(predicate)
            .SingleOrDefaultAsync();

        var mapperForItem = await taskForItem.ConfigureAwait(false);

        if (mapperForItem != null)
        {
            var item = new ArticleDomainEntityForItem(mapperForItem);

            await LoadTopicPathItemsForItem(dbContext, item, mapperForItem).ConfigureAwait(false);

            result.Item = item;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<ArticleDomainListGetOperationOutput> GetList(ArticleDomainListGetOperationInput input)
    {
        ArticleDomainListGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        if (!input.TopicIds.Any() && input.TopicId > 0)
        {
            long[] ids = await GetTopicWithDescendantsIds(dbContext, input.TopicId).ConfigureAwait(false);

            if (ids.Length > 1)
            {
                input.TopicId = 0;
                input.TopicIds = ids;
            }
        }

        var predicate = input.CreatePredicate();

        var taskForItems = dbContext.Article
            .Include(x => x.Topic)
            .Where(predicate)
            .ApplySorting(input)
            .ApplyPagination(input)
            .Select(x => new ClientMapperArticleTypeEntity
            {
                Id = x.Id,
                RowGuid = x.RowGuid,
                Title = x.Title,
                Topic = x.Topic,
                TopicId = x.TopicId,
            })
            .ToArrayAsync();

        long? totalCount = null;

        if (input.PageSize > 0)
        {
            using var dbContextForTotalCount = _dbContextFactory.CreateDbContext();

            var taskForTotalCount = dbContextForTotalCount.Article.Where(predicate).LongCountAsync();

            totalCount = await taskForTotalCount.ConfigureAwait(false);
        }

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

        await LoadTopicPathItemsForList(dbContext, itemLookup, mapperForItems).ConfigureAwait(false);

        result.Items = itemLookup.Values.ToArray();

        if (!totalCount.HasValue)
        {
            totalCount = result.Items.LongLength;
        }

        result.TotalCount = totalCount.Value;

        return result;
    }

    /// <inheritdoc/>
    public async Task<ArticleDomainItemGetOperationOutput> SaveItem(ArticleTypeEntity entity)
    {
        ArticleDomainItemGetOperationOutput result;

        using var dbContext = _dbContextFactory.CreateDbContext();

        HashSet<string> loadableProperties = new()
        {
            nameof(ArticleTypeEntity.Body),
            nameof(ArticleTypeEntity.Title),
            nameof(ArticleTypeEntity.TopicId)
        };

        ClientMapperArticleTypeEntity? mapperEntity;

        if (entity.Id > 0)
        {
            ArticleDomainItemGetOperationInput input = new()
            {
                Id = entity.Id
            };

            var predicate = input.CreatePredicate();

            var task = dbContext.Article.Where(predicate).SingleOrDefaultAsync();

            mapperEntity = await task.ConfigureAwait(false);

            mapperEntity?.MergeWithEntity(entity, loadableProperties);
        }
        else
        {
            mapperEntity = entity.ToMapperEntity();

            dbContext.Article.Add(mapperEntity);
        }

        if (mapperEntity != null)
        {
            await dbContext.SaveChangesAsync().ConfigureAwait(false);

            ArticleDomainItemGetOperationInput input = new()
            {
                Id = mapperEntity.Id
            };

            result = await GetItem(input);
        }
        else
        {
            result = new();
        }

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static async Task<long[]> GetTopicWithDescendantsIds(ClientMapperDbContext dbContext, long topicId)
    {
        long[] result;

        var topic = await dbContext.Topic.Where(x => x.Id == topicId).SingleOrDefaultAsync();

        if (topic != null)
        {
            var task = dbContext.Topic
                .Where(x => x.TreePath.IsDescendantOf(topic.TreePath))
                .Select(x => x.Id)
                .ToListAsync();

            var list = await task.ConfigureAwait(false);

            list.Add(topicId);

            result = list.ToArray();
        }
        else
        {
            result = Array.Empty<long>();
        }

        return result;
    }

    private static async Task LoadTopicPathItemsForItem(
        ClientMapperDbContext dbContext,
        ArticleDomainEntityForItem item,
        ClientMapperArticleTypeEntity mapperForItem)
    {
        var mapperForItemTopic = mapperForItem.Topic;

        long[] ancestorIds = mapperForItemTopic.TreePath.ToString().FromTreePathToInt64ArrayOfAncestors();

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

        item.AddTopicPathItem(new OptionValueObjectWithInt64Id(mapperForItemTopic.Id, mapperForItemTopic.Name));
    }

    private static async Task LoadTopicPathItemsForList(
        ClientMapperDbContext dbContext,
        Dictionary<long, ArticleDomainEntityForList> itemLookup,
        IEnumerable<ClientMapperArticleTypeEntity> mapperForItems)
    {
        long[] ancestorIdsForLookup = mapperForItems
            .SelectMany(x => x.Topic.TreePath.ToString().FromTreePathToInt64ArrayOfAncestors())
            .Distinct()
            .ToArray();

        Dictionary<long, OptionValueObjectWithInt64Id> ancestorLookup;

        if (ancestorIdsForLookup.Any())
        {
            var taskForAncestorLookup = dbContext.Topic
                .Where(x => ancestorIdsForLookup.Contains(x.Id))
                .Select(x => new OptionValueObjectWithInt64Id(x.Id, x.Name))
                .ToDictionaryAsync(x => x.Id);

            ancestorLookup = await taskForAncestorLookup.ConfigureAwait(false);
        }
        else
        {
            ancestorLookup = new();
        }

        foreach (var mapperForItem in mapperForItems)
        {
            if (itemLookup.TryGetValue(mapperForItem.Id, out var item))
            {
                var mapperForItemTopic = mapperForItem.Topic;

                if (ancestorLookup.Any())
                {
                    long[] ancestorIds = mapperForItemTopic.TreePath.ToString()
                        .FromTreePathToInt64ArrayOfAncestors();

                    foreach (long ancestorId in ancestorIds)
                    {
                        if (ancestorLookup.TryGetValue(ancestorId, out var ancestor))
                        {
                            item.AddTopicPathItem(ancestor);
                        }
                    }
                }

                item.AddTopicPathItem(new OptionValueObjectWithInt64Id(
                    mapperForItemTopic.Id,
                    mapperForItemTopic.Name));
            }
        }
    }

    #endregion Private methods
}
