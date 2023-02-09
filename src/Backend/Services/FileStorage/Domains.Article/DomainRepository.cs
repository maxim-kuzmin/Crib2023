// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Репозиторий домена.
/// </summary>
public class DomainRepository : MapperRepository<ArticleEntity>, IArticleRepository
{
    #region Properties

    private IMapperDbContextFactory DbContextFactory { get; init; }

    private MapperDbManager DbManager { get; init; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="dbContextFactory">Фабрика контекста базы данных.</param>
    /// <param name="dbManager">Менеджер базы данных.</param>
    /// <param name="mediator">Посредник.</param>
    public DomainRepository(
        IMapperDbContextFactory dbContextFactory,
        MapperDbManager dbManager,
        IMediator mediator)
        : base(dbManager.DbContext, mediator)
    {
        DbContextFactory = dbContextFactory;
        DbManager = dbManager;
    }

    #endregion Constructors

    #region Public methods

    /// <inheritdoc/>
    public async Task<ArticleItemGetOperationOutput> GetItem(ArticleItemGetOperationInput input)
    {
        ArticleItemGetOperationOutput result = new();

        using var dbContext = DbContextFactory.CreateDbContext();

        var mapperArticle = await dbContext.Article
            .Include(x => x.Topic)
            .ApplyFiltering(input)
            .SingleOrDefaultAsync();

        if (mapperArticle != null)
        {
            var entity = new ArticleEntity(mapperArticle);

            LoadTopic(entity, mapperArticle);

            result.Entity = entity;
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

        var mapperArticleList = await taskForItems;

        var itemLookup = mapperArticleList
            .Select(x => new ArticleEntity(x))
            .ToDictionary(x => x.Data.Id);

        LoadTopic(itemLookup, mapperArticleList);

        result.Items = itemLookup.Values.ToArray();
        result.TotalCount = await taskForTotalCount;

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static void LoadTopic(ArticleEntity entity, MapperArticleTypeEntity mapperDummyMain)
    {
        var mapperTopic = mapperDummyMain.Topic;

        if (mapperTopic != null)
        {
            entity.Topic = new TopicEntity(mapperTopic);
        }
    }

    private static void LoadTopic(
        Dictionary<long, ArticleEntity> itemLookup,
        MapperArticleTypeEntity[] mapperArticleList)
    {
        foreach (var mapperArticle in mapperArticleList)
        {
            if (itemLookup.TryGetValue(mapperArticle.Id, out ArticleEntity? item))
            {
                LoadTopic(item, mapperArticle);
            }
        }
    }

    #endregion Private methods
}
