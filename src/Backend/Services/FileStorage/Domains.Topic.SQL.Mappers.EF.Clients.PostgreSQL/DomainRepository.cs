// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL;

/// <summary>
/// Репозиторий домена.
/// </summary>
public class DomainRepository : MapperRepository<ArticleEntity>, ITopicRepository
{
    #region Properties

    private IClientMapperDbContextFactory DbContextFactory { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="dbContextFactory">Фабрика контекста базы данных.</param>
    /// <param name="dbManager">Менеджер базы данных.</param>
    /// <param name="mediator">Посредник.</param>
    public DomainRepository(
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
    public async Task<TopicItemGetOperationOutput> GetItem(TopicItemGetOperationInput input)
    {
        TopicItemGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();

        var taskForItem = dbContext.Topic
            .Include(x => x.Parent)
            .ApplyFiltering(input)
            .SingleOrDefaultAsync();

        var mapperForItem = await taskForItem.ConfigureAwait(false);

        if (mapperForItem != null)
        {
            var item = new TopicEntity(mapperForItem);

            await LoadTopicPathItems(dbContext, item, mapperForItem).ConfigureAwait(false);

            result.Item = item;
        }
        else
        {
            result.IsItemNotFound = true;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<TopicListGetOperationOutput> GetList(TopicListGetOperationInput input)
    {
        TopicListGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();
        using var dbContextForTotalCount = DbContextFactory.CreateDbContext();

        var queryForItems = dbContext.Topic
            .Include(x => x.Parent)
            .ApplyFiltering(input)
            .ApplySorting(input)
            .ApplyPagination(input);

        var queryForTotalCount = dbContextForTotalCount.Topic
            .ApplyFiltering(input);

        var taskForItems = queryForItems.ToArrayAsync();
        var taskForTotalCount = queryForTotalCount.CountAsync();

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        var itemLookup = mapperForItems
            .Select(x => new TopicEntity(x))
            .ToDictionary(x => x.Data.Id);

        await LoadTopicPathItems(dbContext, itemLookup, mapperForItems).ConfigureAwait(false);

        result.Items = itemLookup.Values.ToArray();
        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static async Task LoadTopicPathItems(
        ClientMapperDbContext dbContext,
        TopicEntity item,
        ClientMapperTopicTypeEntity mapperForItem)
    {
        var mapperTopic = mapperForItem.Topic.Build();

        long[] ancestorIds = mapperTopic.TreePath.FromTreePathToInt64ArrayOfAncestors();

        if (ancestorIds.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => ancestorIds.Contains(x.Id))
                .Select(x => new OptionValueObject(x.Id, x.Name))
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

        item.AddTopicPathItem(new OptionValueObject(mapperTopic.Id, mapperTopic.Name));
    }

    private static async Task LoadTopicPathItems(
        ClientMapperDbContext dbContext,
        Dictionary<long, ArticleEntity> itemLookup,
        ClientMapperTopicTypeEntity[] mapperForItems)
    {
        long[] ancestorIdsForLookup = mapperForItems
            .SelectMany(x => x.Topic.Build().TreePath.FromTreePathToInt64ArrayOfAncestors())
            .Distinct()
            .ToArray();

        if (ancestorIdsForLookup.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => ancestorIdsForLookup.Contains(x.Id))
                .Select(x => new OptionValueObject(x.Id, x.Name))
                .ToDictionaryAsync(x => x.Id);

            var ancestorLookup = await taskForLookup.ConfigureAwait(false);

            foreach (var mapperForItem in mapperForItems)
            {
                if (itemLookup.TryGetValue(mapperForItem.Id, out var item))
                {
                    var mapperTopic = mapperForItem.Topic;

                    if (ancestorLookup.Any())
                    {
                        long[] ancestorIds = mapperTopic.TreePath.FromTreePathToInt64ArrayOfAncestors();

                        foreach (long ancestorId in ancestorIds)
                        {
                            if (ancestorLookup.TryGetValue(ancestorId, out var ancestor))
                            {
                                item.AddTopicPathItem(ancestor);
                            }
                        }
                    }

                    item.AddTopicPathItem(new OptionValueObject(mapperTopic.Id, mapperTopic.Name));
                }
            }
        }
    }

    #endregion Private methods
}
