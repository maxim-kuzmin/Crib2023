// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Репозиторий домена.
/// </summary>
public class ArticleDomainRepository : MapperRepository<ArticleDomainEntity>, IArticleDomainRepository
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
    public async Task<ArticleDomainItemGetOperationOutput> GetItem(ArticleDomainItemGetOperationInput input)
    {
        ArticleDomainItemGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        var taskForItem = dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .SingleOrDefaultAsync();

        var mapperForItem = await taskForItem.ConfigureAwait(false);

        if (mapperForItem != null)
        {
            var item = new ArticleDomainEntity(mapperForItem);

            await LoadTopicPathItems(dbContext, item, mapperForItem).ConfigureAwait(false);

            result.Item = item;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<ArticleDomainListGetOperationOutput> GetList(ArticleDomainListGetOperationInput input)
    {
        ArticleDomainListGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        var queryForItems = dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .ApplySorting(input)
            .ApplyPagination(input);

        var taskForItems = queryForItems.ToArrayAsync();

        long? totalCount = null;

        if (input.PageSize > 0)
        {
            using var dbContextForTotalCount = _dbContextFactory.CreateDbContext();

            var queryForTotalCount = dbContextForTotalCount.Article.ApplyFiltering(input);

            totalCount = await queryForTotalCount.LongCountAsync().ConfigureAwait(false);
        }

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        var itemLookup = mapperForItems
            .Select(x => new ArticleDomainEntity(x))
            .ToDictionary(x => x.Data.Id);

        await LoadTopicPathItems(dbContext, itemLookup, mapperForItems).ConfigureAwait(false);

        result.Items = itemLookup.Values.ToArray();

        if (!totalCount.HasValue)
        {
            totalCount = result.Items.LongLength;
        }

        result.TotalCount = totalCount.Value;

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static async Task LoadTopicPathItems(
        ClientMapperDbContext dbContext,
        ArticleDomainEntity item,
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

    private static async Task LoadTopicPathItems(
        ClientMapperDbContext dbContext,
        Dictionary<long, ArticleDomainEntity> itemLookup,
        IEnumerable<ClientMapperArticleTypeEntity> mapperForItems)
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
}
