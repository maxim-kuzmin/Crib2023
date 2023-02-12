// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article.SQL.Mappers.EF.Clients.PostgreSQL;

/// <summary>
/// Расширение домена.
/// </summary>
public static class DomainExtension
{
    #region Public methods

    /// <summary>
    /// Применить. Фильтрацию.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом фильтрации.</returns>
    public static IQueryable<ClientMapperArticleTypeEntity> ApplyFiltering(
        this IQueryable<ClientMapperArticleTypeEntity> query,
        ArticleItemGetOperationInput input
        )
    {
        if (input.Id > 0)
        {
            query = query.Where(x => x.Id == input.Id);
        }

        if (input.Title != null)
        {
            query = query.Where(x => x.Title == input.Title);
        }

        return query;
    }

    /// <summary>
    /// Применить. Фильтрацию.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом фильтрации.</returns>
    public static IQueryable<ClientMapperArticleTypeEntity> ApplyFiltering(
        this IQueryable<ClientMapperArticleTypeEntity> query,
        ArticleListGetOperationInput input
        )
    {
        if (!string.IsNullOrWhiteSpace(input.Title))
        {
            query = query.Where(x => x.Title!.Contains(input.Title));
        }

        if (input.Ids != null && input.Ids.Any())
        {
            if (input.Ids.Length > 1)
            {
                query = query.Where(x => input.Ids.Contains(x.Id));
            }
            else
            {
                long entityId = input.Ids[0];

                query = query.Where(x => x.Id == entityId);
            }
        }

        if (input.TopicId > 0)
        {
            query = query.Where(x => x.TopicId == input.TopicId);
        }

        if (input.TopicIds != null && input.TopicIds.Any())
        {
            if (input.TopicIds.Length > 1)
            {
                query = query.Where(x => input.TopicIds.Contains(x.TopicId));
            }
            else
            {
                long id = input.TopicIds[0];

                query = query.Where(x => x.TopicId == id);
            }
        }

        if (!string.IsNullOrWhiteSpace(input.TopicName))
        {
            query = query.Where(x => x.Topic!.Name!.Contains(input.TopicName));
        }

        return query;
    }

    /// <summary>
    /// Применить. Сортировку.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом сортировки.</returns>
    public static IQueryable<ClientMapperArticleTypeEntity> ApplySorting(
        this IQueryable<ClientMapperArticleTypeEntity> query,
        ArticleListGetOperationInput input
        )
    {
        if (string.IsNullOrWhiteSpace(input.SortField))
        {
            throw new NullOrWhiteSpaceStringVariableException(typeof(DomainExtension), nameof(input), nameof(input.SortField));
        }

        string sortField = input.SortField.ToLower();

        if (string.IsNullOrWhiteSpace(input.SortDirection))
        {
            throw new NullOrWhiteSpaceStringVariableException(typeof(DomainExtension), nameof(input), nameof(input.SortDirection));
        }

        string sortDirection = input.SortDirection.ToLower();

        string sortFieldForId = nameof(ArticleTypeEntity.Id).ToLower();
        string sortFieldForTitle = nameof(ArticleTypeEntity.Title).ToLower();
        string sortFieldForObjectTopic = $"{typeof(TopicTypeEntity).Name}.{nameof(TopicTypeEntity.Name)}".ToLower();

        if (sortField == sortFieldForId)
        {
            switch (sortDirection)
            {
                case OperationOptions.SORT_DIRECTION_ASC:
                    query = query.OrderBy(x => x.Id);
                    break;
                case OperationOptions.SORT_DIRECTION_DESC:
                    query = query.OrderByDescending(x => x.Id);
                    break;
            }
        }
        else if (sortField == sortFieldForTitle)
        {
            switch (sortDirection)
            {
                case OperationOptions.SORT_DIRECTION_ASC:
                    query = query.OrderBy(x => x.Title);
                    break;
                case OperationOptions.SORT_DIRECTION_DESC:
                    query = query.OrderByDescending(x => x.Title);
                    break;
            }
        }
        else if (sortField == sortFieldForObjectTopic)
        {
            switch (sortDirection)
            {
                case OperationOptions.SORT_DIRECTION_ASC:
                    query = query.OrderBy(x => x.Topic!.Name);
                    break;
                case OperationOptions.SORT_DIRECTION_DESC:
                    query = query.OrderByDescending(x => x.Topic!.Name);
                    break;
            }
        }

        if (!string.IsNullOrWhiteSpace(sortField) && sortField != sortFieldForId)
        {
            query = ((IOrderedQueryable<ClientMapperArticleTypeEntity>)query).ThenBy(x => x.Id);
        }

        return query;
    }

    #endregion Public methods
}
