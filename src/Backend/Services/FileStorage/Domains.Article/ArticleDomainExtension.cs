﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

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
            if (input.SortDirection.Equals(OperationSortDirection.ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Id);
            }
            else if (input.SortDirection.Equals(OperationSortDirection.DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.Id);
            }
        }
        else if (input.SortField.Equals(nameof(ArticleTypeEntity.Title), StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationSortDirection.ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Title);
            }
            else if (input.SortDirection.Equals(OperationSortDirection.DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.Title);
            }
        }
        else if (input.SortField.Equals($"{typeof(TopicTypeEntity).Name}.{nameof(TopicTypeEntity.Name)}", StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationSortDirection.ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Topic.Name);
            }
            else if (input.SortDirection.Equals(OperationSortDirection.DESC, StringComparison.OrdinalIgnoreCase))
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

    /// <summary>
    /// Нормализовать.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <returns>Сущность.</returns>
    public static ArticleTypeEntity Normalize(this ArticleTypeEntity entity)
    {
        if (entity.Id < 0)
        {
            entity.Id = 0;
        }

        entity.Hash = entity.Hash.Trim();
        entity.Path = entity.Path.Trim();
        entity.Title = entity.Title.Trim();

        return entity;
    }

    /// <summary>
    /// Получить свойства с недействительными значениями.
    /// </summary>
    /// <param name="entity">Сущность.</param>
    /// <param name="domainResource">Ресурс домена.</param>
    /// <param name="operationsResource">Ресурс операций.</param>
    /// <returns>Свойства с недействительными значениями</returns>
    public static OperationInputInvalidProperties GetInvalidProperties(
        this ArticleTypeEntity entity,
        IArticleDomainResource domainResource,
        IOperationsResource operationsResource)
    {
        OperationInputInvalidProperties result = new();

        bool isHashInvalid = string.IsNullOrWhiteSpace(entity.Hash);
        bool isPathInvalid = string.IsNullOrWhiteSpace(entity.Path);
        bool isTitleInvalid = string.IsNullOrWhiteSpace(entity.Title);
        bool isTopicIdInvalid = entity.TopicId < 1;

        if (isHashInvalid || isPathInvalid || isTitleInvalid || isTopicIdInvalid)
        {
            if (isHashInvalid)
            {
                var values = result.GetOrAdd(nameof(entity.Hash));

                string value = domainResource.GetValidValueForHash();

                values.Add(value);
            }

            if (isPathInvalid)
            {
                var values = result.GetOrAdd(nameof(entity.Path));

                string value = domainResource.GetValidValueForPath();

                values.Add(value);
            }

            if (isTitleInvalid)
            {
                var values = result.GetOrAdd(nameof(entity.Title));

                string value = domainResource.GetValidValueForTitle();

                values.Add(value);
            }

            if (isTopicIdInvalid)
            {
                var values = result.GetOrAdd(nameof(entity.TopicId));

                string value = domainResource.GetValidValueForTopicId();

                values.Add(value);
            }
        }

        return result;
    }

    #endregion Public methods
}
