// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL;

/// <summary>
/// Репозиторий домена.
/// </summary>
public class DomainRepository : MapperRepository<ArticleEntity>, IArticleRepository
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
    public async Task<ArticleItemGetOperationOutput> GetItem(ArticleItemGetOperationInput input)
    {
        ArticleItemGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();

        var taskForItem = dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .SingleOrDefaultAsync();

        var mapperArticle = await taskForItem.ConfigureAwait(false);

        if (mapperArticle != null)
        {
            var item = new ArticleEntity(mapperArticle);

            await LoadTopicPathItems(dbContext, item, mapperArticle).ConfigureAwait(false);

            result.Item = item;
        }
        else
        {
            result.IsItemNotFound = true;
        }

        return result;
    }

    /// <inheritdoc/>
    public async Task<ArticleListGetOperationOutput> GetList(ArticleListGetOperationInput input)
    {
        ArticleListGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();
        using var dbContextForTotalCount = DbContextFactory.CreateDbContext();

        var queryForItems = dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .ApplySorting(input)
            .ApplyPagination(input);

        var queryForTotalCount = dbContextForTotalCount.Article
            .ApplyFiltering(input);

        var taskForItems = queryForItems.ToArrayAsync();
        var taskForTotalCount = queryForTotalCount.CountAsync();

        var mapperArticleList = await taskForItems.ConfigureAwait(false);

        var itemLookup = mapperArticleList
            .Select(x => new ArticleEntity(x))
            .ToDictionary(x => x.Data.Id);

        await LoadTopicPathItems(dbContext, itemLookup, mapperArticleList).ConfigureAwait(false);

        result.Items = itemLookup.Values.ToArray();
        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static async Task LoadTopicPathItems(
        ClientMapperDbContext dbContext,
        ArticleEntity item,
        ClientMapperArticleTypeEntity mapperArticle)
    {
        var mapperTopic = mapperArticle.Topic;

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
        ClientMapperArticleTypeEntity[] mapperArticleList)
    {
        long[] ancestorIdsForLookup = mapperArticleList
            .SelectMany(x => x.Topic.TreePath.FromTreePathToInt64ArrayOfAncestors())
            .Distinct()
            .ToArray();

        if (ancestorIdsForLookup.Any())
        {
            var taskForLookup = dbContext.Topic
                .Where(x => ancestorIdsForLookup.Contains(x.Id))
                .Select(x => new OptionValueObject(x.Id, x.Name))
                .ToDictionaryAsync(x => x.Id);

            var ancestorLookup = await taskForLookup.ConfigureAwait(false);

            foreach (var mapperArticle in mapperArticleList)
            {
                if (itemLookup.TryGetValue(mapperArticle.Id, out var item))
                {
                    var mapperTopic = mapperArticle.Topic;

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
