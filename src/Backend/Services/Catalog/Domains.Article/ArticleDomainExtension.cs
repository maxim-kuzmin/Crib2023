// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article;

/// <summary>
/// Расширение домена.
/// </summary>
public static class ArticleDomainExtension
{
    #region Public methods

    /// <summary>
    /// Применить фильтрацию.
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
        
        if (!string.IsNullOrWhiteSpace(input.Title))
        {
            query = query.Where(x => x.Title == input.Title);
        }

        if (input.TopicId > 0)
        {
            query = query.Where(x => x.TopicId == input.TopicId);
        }

        return query;
    }

    /// <summary>
    /// Применить фильтрацию.
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
            query = query.Where(x => x.Title.Contains(input.Title));
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
    /// Применить сортировку.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом сортировки.</returns>
    public static IQueryable<ClientMapperArticleTypeEntity> ApplySorting(
        this IQueryable<ClientMapperArticleTypeEntity> query,
        ArticleListGetOperationInput input
        )
    {
        if (input.SortField.Equals(nameof(ArticleTypeEntity.Id), StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Id);
            }
            else if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.Id);
            }
        }
        else if (input.SortField.Equals(nameof(ArticleTypeEntity.Title), StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Title);
            }
            else if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.Title);
            }
        }
        else if (input.SortField.Equals($"{typeof(TopicTypeEntity).Name}.{nameof(TopicTypeEntity.Name)}", StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Topic.Name);
            }
            else if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.Topic.Name);
            }
        }

        if (!string.IsNullOrWhiteSpace(input.SortField)
            && !input.SortField.Equals(nameof(ArticleTypeEntity.Id), StringComparison.OrdinalIgnoreCase))
        {
            query = ((IOrderedQueryable<ClientMapperArticleTypeEntity>)query).ThenBy(x => x.Id);
        }

        return query;
    }

    #endregion Public methods
}
