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

            LoadTopic(item, mapperArticle);

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

        LoadTopic(itemLookup, mapperArticleList);

        result.Items = itemLookup.Values.ToArray();
        result.TotalCount = await taskForTotalCount.ConfigureAwait(false);

        return result;
    }

    #endregion Public methods

    #region Private methods

    private static void LoadTopic(ArticleEntity item, ClientMapperArticleTypeEntity mapperArticle)
    {
        var mapperTopic = mapperArticle.Topic;

        if (mapperTopic != null)
        {
            //makc//!!!// item.Topic = new TopicEntity(mapperTopic);
        }
    }

    private static void LoadTopic(
        Dictionary<long, ArticleEntity> itemLookup,
        ClientMapperArticleTypeEntity[] mapperArticleList)
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
