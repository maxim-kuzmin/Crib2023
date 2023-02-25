// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.SQL.Mappers.EF.Clients.PostgreSQL;

/// <summary>
/// Репозиторий домена.
/// </summary>
public class DomainRepository : MapperRepository<ArticleEntity>, ITopicRepository
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

        var query = dbContext.Topic.AsQueryable();

        if (input.Axis == TreeNodeGetOperationAxis.Parent)
        {
            query = query.Include(x => x.Parent).Where(x => x.Parent != null);
        }

        query = query.ApplyFiltering(input);

        IQueryable<Item> queryForItem;

        if (input.Axis == TreeNodeGetOperationAxis.Parent)
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
            result.Item = new TopicEntity(
                mapperForItem.Data,
                mapperForItem.TreeHasChildren,
                mapperForItem.TreeLevel,
                mapperForItem.Data.TreePath);
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
            .ApplyPagination(input)
            .Select(x => new
            {
                Data = x,
                TreeHasChildren = x.Children.Any(),
                TreeLevel = x.TreePath.NLevel
            });

        var queryForTotalCount = dbContextForTotalCount.Topic
            .ApplyFiltering(input);

        var taskForItems = queryForItems.ToArrayAsync();
        var taskForTotalCount = queryForTotalCount.CountAsync();

        var mapperForItems = await taskForItems.ConfigureAwait(false);

        result.Items = mapperForItems.Select(x =>
            new TopicEntity(x.Data, x.TreeHasChildren, x.TreeLevel, x.Data.TreePath))
            .ToArray();

        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    #endregion Public methods

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
