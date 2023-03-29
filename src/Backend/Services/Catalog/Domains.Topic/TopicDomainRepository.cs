// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

namespace Crib2023.Backend.Services.Catalog.Domains.Topic;

/// <summary>
/// Репозиторий домена "Тема".
/// </summary>
public class TopicDomainRepository : MapperRepository<TopicDomainEntity>, ITopicDomainRepository
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
    public TopicDomainRepository(
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
    public async Task<TopicDomainItemGetOperationOutput> GetItem(TopicDomainItemGetOperationInput input)
    {
        TopicDomainItemGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();

        var query = dbContext.Topic.AsQueryable();

        if (input.Axis == TreeGetOperationAxisForItem.Parent)
        {
            query = query.Include(x => x.Parent).Where(x => x.Parent != null);
        }

        query = query.ApplyFiltering(input);

        IQueryable<Item> queryForItem;

        if (input.Axis == TreeGetOperationAxisForItem.Parent)
        {
            queryForItem = query.Select(x => new Item(
                x.Parent!,
                x.Parent!.Children.Any(),
                x.Parent!.TreePath.NLevel));
        }
        else
        {
            queryForItem = query.Select(x => new Item(x, x.Children.Any(), x.TreePath.NLevel));
        }

        var mapperForItem = await queryForItem.SingleOrDefaultAsync().ConfigureAwait(false);

        if (mapperForItem != null)
        {
            var item = result.Item = new TopicDomainEntityForItem(
                mapperForItem.Data,
                mapperForItem.TreeHasChildren,
                mapperForItem.TreeLevel,
                mapperForItem.Data.TreePath);

            await LoadTreeAncestorsForItem(dbContext, item, mapperForItem.Data).ConfigureAwait(false);

            result.Item = item;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<TopicDomainListGetOperationOutput> GetList(TopicDomainListGetOperationInput input)
    {
        TopicDomainListGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();
        using var dbContextForTotalCount = DbContextFactory.CreateDbContext();

        var queryForItems = dbContext.Topic
            .Include(x => x.Parent)
            .ApplyFiltering(input)
            .ApplySorting(input)
            .ApplyPagination(input)
            .Select(x => new Item(x, x.Children.Any(), x.TreePath.NLevel));

        var queryForTotalCount = dbContextForTotalCount.Topic
            .ApplyFiltering(input);

        var taskForItems = queryForItems.ToArrayAsync();
        var taskForTotalCount = queryForTotalCount.CountAsync();

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        var itemLookup = mapperForItems
            .Select(x => new TopicDomainEntityForItem(new TopicTypeEntity
            {
                Id = x.Data.Id,
                RowGuid = x.Data.RowGuid,
                Name = x.Data.Name,
                ParentId = x.Data.ParentId
            }))
            .ToDictionary(x => x.Data.Id);

        await LoadTreeAncestorsForList(dbContext, itemLookup, mapperForItems).ConfigureAwait(false);

        result.Items = mapperForItems.Select(x =>
            new TopicDomainEntityForItem(x.Data, x.TreeHasChildren, x.TreeLevel, x.Data.TreePath))
            .ToArray();

        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    /// <inheritdoc/>
    public Task<TopicDomainTreeGetOperationOutput> GetTree(TopicDomainTreeGetOperationInput input)
    {
        throw new NotImplementedException();
    }

    #endregion Public methods

    #region Private methods

    private static async Task LoadTreeAncestorsForItem(
        ClientMapperDbContext dbContext,
        TopicDomainEntityForItem item,
        ClientMapperTopicTypeEntity mapperForItem)
    {
        long[] ancestorIds = mapperForItem.TreePath.ToString().FromTreePathToInt64ArrayOfAncestors();

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
                    item.AddTreeAncestor(option);
                }
            }
        }
    }

    private static async Task LoadTreeAncestorsForList(
        ClientMapperDbContext dbContext,
        Dictionary<long, TopicDomainEntityForItem> itemLookup,
        IEnumerable<Item> mapperForItems)
    {
        long[] ancestorIdsForLookup = mapperForItems
            .Where(x => x.Data.Parent != null)
            .SelectMany(x => x.Data.Parent!.TreePath.ToString().FromTreePathToInt64ArrayOfAncestors())
            .Distinct()
            .ToArray();

        if (ancestorIdsForLookup.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => ancestorIdsForLookup.Contains(x.Id))
                .Select(x => new OptionValueObjectWithInt64Id(x.Id, x.Name))
                .ToDictionaryAsync(x => x.Id);

            var ancestorLookup = await taskForLookup.ConfigureAwait(false);

            if (ancestorLookup.Any())
            {
                foreach (var mapperForItem in mapperForItems)
                {
                    if (itemLookup.TryGetValue(mapperForItem.Data.Id, out var item))
                    {
                        var mapperForItemParent = mapperForItem.Data.Parent;

                        if (mapperForItemParent != null)
                        {
                            long[] ancestorIds = mapperForItemParent.TreePath.ToString()
                                .FromTreePathToInt64ArrayOfAncestors();

                            foreach (long ancestorId in ancestorIds)
                            {
                                if (ancestorLookup.TryGetValue(ancestorId, out var ancestor))
                                {
                                    item.AddTreeAncestor(ancestor);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    #endregion Private methods

    #region Classes

    private class Item
    {
        #region Properties

        public ClientMapperTopicTypeEntity Data { get; }

        public bool TreeHasChildren { get; }

        public int TreeLevel { get; }

        #endregion Properties

        #region Constructors

        public Item(ClientMapperTopicTypeEntity data, bool treeHasChildren, int treeLevel)
        {
            Data = data;
            TreeLevel = treeLevel;
            TreeHasChildren = treeHasChildren;
        }

        #endregion Constructors
    }

    #endregion Classes
}
