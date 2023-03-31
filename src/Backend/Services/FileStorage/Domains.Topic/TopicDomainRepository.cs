// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic;

/// <summary>
/// Репозиторий домена "Тема".
/// </summary>
public class TopicDomainRepository : MapperRepository<TopicDomainEntity>, ITopicDomainRepository
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
    public TopicDomainRepository(
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
    public async Task<TopicDomainItemGetOperationOutput> GetItem(TopicDomainItemGetOperationInput input)
    {
        TopicDomainItemGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        var query = dbContext.Topic.AsQueryable();

        if (input.Axis == TreeGetOperationAxisForItem.Parent)
        {
            query = query.Include(x => x.Parent).Where(x => x.Parent != null);
        }

        var predicate = input.CreatePredicate();

        query = query.Where(predicate);

        var queryForItem = input.Axis == TreeGetOperationAxisForItem.Parent
            ? query.Select(x => new Item(x.Parent!, x.Parent!.Children.Any(), x.Parent!.TreePath.NLevel, false))
            : query.Select(x => new Item(x, x.Children.Any(), x.TreePath.NLevel, false));

        var mapperForItem = await queryForItem.SingleOrDefaultAsync().ConfigureAwait(false);

        if (mapperForItem != null)
        {
            var item = result.Item = CreateEntityForItem(mapperForItem);

            await LoadTreeAncestorsForItem(dbContext, item, mapperForItem.Data).ConfigureAwait(false);

            result.Item = item;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<TopicDomainListGetOperationOutput> GetList(TopicDomainListGetOperationInput input)
    {
        TopicDomainListGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        long[] expandedPathIds = await GetExpandedPathIds(dbContext, input);

        var predicate = input.CreatePredicate(expandedPathIds);

        var taskForItems = dbContext.Topic
            .Include(x => x.Parent)
            .Where(predicate)
            .ApplySorting(input)
            .ApplyPagination(input)
            .Select(x => new Item(x, x.Children.Any(), x.TreePath.NLevel, false))
            .ToListAsync();

        long? totalCount = null;

        if (input.PageSize > 0)
        {
            using var dbContextForTotalCount = _dbContextFactory.CreateDbContext();

            var taskForTotalCount = dbContextForTotalCount.Topic.Where(predicate).LongCountAsync();

            totalCount = await taskForTotalCount.ConfigureAwait(false);
        }

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        var itemLookup = CreateItemLookup(mapperForItems);

        await LoadTreeAncestorsForList(dbContext, itemLookup, mapperForItems).ConfigureAwait(false);

        result.Items = CreateListOutputItems(itemLookup, input.RootNodeId, mapperForItems);

        if (!totalCount.HasValue)
        {
            totalCount = result.Items.LongLength;
        }

        result.TotalCount = totalCount.Value;

        return result;
    }

    /// <inheritdoc/>
    public async Task<TopicDomainTreeGetOperationOutput> GetTree(TopicDomainTreeGetOperationInput input)
    {
        TopicDomainTreeGetOperationOutput result = new();

        using var dbContext = _dbContextFactory.CreateDbContext();

        var predicate = input.CreatePredicate();

        var taskForItems = dbContext.Topic
            .Include(x => x.Parent)
            .Where(predicate)
            .ApplySorting(input)
            .ApplyPagination(input)
            .Select(x => new Item(x, x.Children.Any(), x.TreePath.NLevel, false))
            .ToListAsync();

        long? totalCount = null;

        if (input.PageSize > 0)
        {
            using var dbContextForTotalCount = _dbContextFactory.CreateDbContext();

            var taskForTotalCount = dbContextForTotalCount.Topic.Where(predicate).LongCountAsync();

            totalCount = await taskForTotalCount.ConfigureAwait(false);
        }

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        await LoadExpandedPath(dbContext, input, mapperForItems).ConfigureAwait(false);

        var itemLookup = CreateItemLookup(mapperForItems);

        result.Nodes = CreateTreeOutputNodes(itemLookup, input.RootNodeId, mapperForItems);

        if (!totalCount.HasValue)
        {
            totalCount = result.Nodes.LongLength;
        }

        result.TotalCount = totalCount.Value;

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static TopicDomainEntityForItem CreateEntityForItem(Item item)
    {
        return new TopicDomainEntityForItem(
            data: item.Data,
            treeHasChildren: item.TreeHasChildren,
            treeIsExpanded: item.TreeIsExpanded,
            treeLevel: item.TreeLevel,
            treePath: item.Data.TreePath);
    }

    private static TopicDomainEntityForTree CreateEntityForTree(Item item)
    {
        return new TopicDomainEntityForTree(
            data: item.Data,
            treeHasChildren: item.TreeHasChildren,
            treeIsExpanded: item.TreeIsExpanded,
            treeLevel: item.TreeLevel,
            treePath: item.Data.TreePath);
    }

    private static Dictionary<long, Item> CreateItemLookup(IEnumerable<Item> mapperForItems)
    {
        Dictionary<long, Item> result = new();

        foreach (var mapperForItem in mapperForItems)
        {
            result[mapperForItem.Data.Id] = mapperForItem;
        }

        return result;
    }

    private static Item[] CreateItemsWithChildren(
        Dictionary<long, Item> itemLookup,
        long? rootNodeId,
        List<Item> mapperForItems)
    {
        List<Item> result = new();

        Item? parent = null;

        long rootNodeIdValue = rootNodeId ?? 0;

        foreach (var item in mapperForItems)
        {
            if (!itemLookup.TryGetValue(item.Data.Id, out var child))
            {
                continue;
            }

            long parentIdValue = item.Data.ParentId ?? 0;

            if (parentIdValue != rootNodeIdValue)
            {
                if (parent is null || parent.Data.Id != parentIdValue)
                {
                    if (!itemLookup.TryGetValue(parentIdValue, out parent))
                    {
                        continue;
                    }
                }

                parent.TreeChildren.Add(child);
            }
            else
            {
                result.Add(child);
            }
        }

        return result.ToArray();
    }

    private static TopicDomainEntityForItem[] CreateListOutputItems(
        Dictionary<long, Item> itemLookup,
        long? rootNodeId,
        List<Item> mapperForItems)
    {
        List<TopicDomainEntityForItem> result = new();

        var items = CreateItemsWithChildren(itemLookup, rootNodeId, mapperForItems);

        FillListOutputItems(items, result: result);

        return result.ToArray();
    }

    private static TopicDomainEntityForTree[] CreateTreeOutputNodes(
        Dictionary<long, Item> itemLookup,
        long? rootNodeId,
        List<Item> mapperForItems)
    {
        List<TopicDomainEntityForTree> result = new();

        var items = CreateItemsWithChildren(itemLookup, rootNodeId, mapperForItems);

        FillTreeOutputNodes(items, result: result);

        return result.ToArray();
    }

    private static void FillTreeOutputNodes(
        IEnumerable<Item> items,
        List<TopicDomainEntityForTree>? result = null,
        TopicDomainEntityForTree? parent = null)
    {
        foreach (var item in items)
        {
            var entity = CreateEntityForTree(item);

            result?.Add(entity);

            parent?.AddTreeChild(entity);

            if (item.TreeChildren.Count > 0)
            {
                FillTreeOutputNodes(item.TreeChildren, parent: entity);
            }
        }
    }

    private static void FillListOutputItems(
        IEnumerable<Item> items,
        List<TopicDomainEntityForItem> result)
    {
        foreach (var item in items)
        {
            var entity = CreateEntityForItem(item);

            result.Add(entity);

            if (item.TreeChildren.Count > 0)
            {
                FillListOutputItems(item.TreeChildren, result);
            }
        }
    }

    private static async Task<long[]> GetExpandedPathIds(
        ClientMapperDbContext dbContext,
        TopicDomainTreeGetOperationInput input)
    {
        long[] result;

        bool isOk = input.Axis == TreeGetOperationAxisForList.Child
            &&
            (
                input.ExpandedNodeId > 0
                ||
                input.ExpandedNodeIds.Any()
            );

        if (isOk)
        {
            var query = dbContext.Topic.AsQueryable();

            if (input.ExpandedNodeId > 0)
            {
                query = query.Where(x => x.Id == input.ExpandedNodeId);
            }

            if (input.ExpandedNodeIds.Any())
            {
                query = query.Where(x => input.ExpandedNodeIds.Contains(x.Id));
            }

            var task = query.Select(x => x.TreePath.ToString()).ToArrayAsync();

            string[] treePaths = await task.ConfigureAwait(false);

            result = treePaths.SelectMany(x => x.FromTreePathToInt64Array()).Distinct().ToArray();
        }
        else
        {
            result = Array.Empty<long>();
        }

        return result;
    }

    private static async Task LoadExpandedPath(
        ClientMapperDbContext dbContext,
        TopicDomainTreeGetOperationInput input,
        List<Item> mapperForItems)
    {
        long[] expandedPathIds = await GetExpandedPathIds(dbContext, input);

        if (!expandedPathIds.Any())
        {
            return;
        }

        var task = dbContext.Topic
            .Where(expandedPathIds.ToPredicateForExpandedPath())
            .ApplySorting(input)
            .Select(x => new Item(x, x.Children.Any(), x.TreePath.NLevel, expandedPathIds.Contains(x.Id)))
            .ToArrayAsync();

        var mapperForExpandedPathItems = await task.ConfigureAwait(false);

        if (mapperForExpandedPathItems.Any())
        {
            var itemIdLookup = mapperForItems.Select(x => x.Data.Id).ToHashSet();

            mapperForItems.AddRange(mapperForExpandedPathItems.Where(x => !itemIdLookup.Contains(x.Data.Id)));
        }
    }

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
        Dictionary<long, Item> itemLookup,
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
                                    item.TreeAncestors.Add(ancestor);
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

        public List<OptionValueObjectWithInt64Id> TreeAncestors { get; } = new();

        public List<Item> TreeChildren { get; } = new();

        public bool TreeHasChildren { get; }

        public bool TreeIsExpanded { get; }

        public int TreeLevel { get; }

        #endregion Properties

        #region Constructors

        public Item(ClientMapperTopicTypeEntity data, bool treeHasChildren, int treeLevel, bool treeIsExpanded)
        {
            Data = data;
            TreeLevel = treeLevel;
            TreeHasChildren = treeHasChildren;
            TreeIsExpanded = treeIsExpanded;
        }

        #endregion Constructors
    }

    #endregion Classes
}
