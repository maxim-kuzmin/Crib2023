// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Расширение домена "Статья".
/// </summary>
public static class ArticleDomainExtension
{
    #region Public methods

    /// <summary>
    /// Применить сортировку.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом сортировки.</returns>
    public static IQueryable<ClientMapperArticleTypeEntity> ApplySorting(
        this IQueryable<ClientMapperArticleTypeEntity> query,
        ArticleDomainListGetOperationInput input
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
