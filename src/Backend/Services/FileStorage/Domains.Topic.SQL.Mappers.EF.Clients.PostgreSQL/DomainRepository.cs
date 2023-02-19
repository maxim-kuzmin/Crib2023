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

            await LoadTree(dbContext, item, mapperForItem).ConfigureAwait(false);

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

        await LoadTree(dbContext, itemLookup, mapperForItems).ConfigureAwait(false);

        result.Items = itemLookup.Values.ToArray();
        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static async Task LoadTree(
        ClientMapperDbContext dbContext,
        TopicEntity item,
        ClientMapperTopicTypeEntity mapperForItem)
    {
        var taskForTreeHasChildten = dbContext.Topic.Where(x => x.ParentId == mapperForItem.Id).AnyAsync();

        bool treeHasChildten = await taskForTreeHasChildten.ConfigureAwait(false);

        item.LoadTree(treeHasChildten, mapperForItem.TreePath.NLevel, mapperForItem.TreePath);
    }

    private static async Task LoadTree(
        ClientMapperDbContext dbContext,
        Dictionary<long, TopicEntity> itemLookup,
        ClientMapperTopicTypeEntity[] mapperForItems)
    {
        long[] idsForLookup = mapperForItems.Select(x => x.Id).Distinct().ToArray();

        if (idsForLookup.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => x.ParentId > 0 && idsForLookup.Contains(x.ParentId.Value))
                .GroupBy(x => x.Id)
                .ToDictionaryAsync(x => x.Key, x => x.Any());

            var childrenExistenceLookup = await taskForLookup.ConfigureAwait(false);

            foreach (var mapperForItem in mapperForItems)
            {
                if (itemLookup.TryGetValue(mapperForItem.Id, out var item))
                {
                    childrenExistenceLookup.TryGetValue(mapperForItem.Id, out bool treeHasChildten);

                    item.LoadTree(treeHasChildten, mapperForItem.TreePath.NLevel, mapperForItem.TreePath);
                }
            }
        }
    }

    #endregion Private methods
}
