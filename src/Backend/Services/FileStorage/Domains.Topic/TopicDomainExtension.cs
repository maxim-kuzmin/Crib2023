// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic;

/// <summary>
/// Расширение домена.
/// </summary>
public static class TopicDomainExtension
{
    #region Public methods

    /// <summary>
    /// Применить фильтрацию.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом фильтрации.</returns>
    public static IQueryable<ClientMapperTopicTypeEntity> ApplyFiltering(
        this IQueryable<ClientMapperTopicTypeEntity> query,
        TopicDomainItemGetOperationInput input
        )
    {
        if (input.Id > 0)
        {
            query = query.Where(x => x.Id == input.Id);
        }

        if (!string.IsNullOrWhiteSpace(input.Name))
        {
            query = query.Where(x => x.Name == input.Name);
        }

        if (input.ParentId > 0)
        {
            query = query.Where(x => x.ParentId == input.ParentId);
        }

        return query;
    }

    /// <summary>
    /// Применить фильтрацию.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом фильтрации.</returns>
    public static IQueryable<ClientMapperTopicTypeEntity> ApplyFiltering(
        this IQueryable<ClientMapperTopicTypeEntity> query,
        TopicDomainListGetOperationInput input
        )
    {
        if (!string.IsNullOrWhiteSpace(input.Name))
        {
            query = query.Where(x => x.Name.Contains(input.Name));
        }

        if (input.Ids != null && input.Ids.Any())
        {
            if (input.Ids.Length > 1)
            {
                query = query.Where(x => input.Ids.Contains(x.Id));
            }
            else
            {
                long id = input.Ids[0];

                query = query.Where(x => x.Id == id);
            }
        }

        if (!string.IsNullOrWhiteSpace(input.TreePath))
        {
            var treePath = new LTree(input.TreePath);

            switch (input.Axis)
            {
                case TreePathGetOperationAxis.Ancestor:
                    query = query.Where(x => x.TreePath.IsAncestorOf(treePath));
                    break;
                case TreePathGetOperationAxis.AncestorOrSelf:
                    query = query.Where(x => x.TreePath.IsAncestorOf(treePath) || x.TreePath == treePath);
                    break;
                case TreePathGetOperationAxis.Descendant:
                    query = query.Where(x => x.TreePath.IsDescendantOf(treePath));
                    break;
                case TreePathGetOperationAxis.DescendantOrSelf:
                    query = query.Where(x => x.TreePath.IsDescendantOf(treePath) || x.TreePath == treePath);
                    break;
                case TreePathGetOperationAxis.ParentOrSelf:
                    {
                        string parentTreePathString = input.TreePath.FromTreePathToParentTreePath();

                        LTree? parentTreePath = null;

                        if (!string.IsNullOrWhiteSpace(parentTreePathString))
                        {
                            parentTreePath = new LTree(parentTreePathString);
                        }

                        if (parentTreePath != null)
                        {
                            query = query.Where(x => x.TreePath == parentTreePath || x.TreePath == treePath);
                        }
                        else
                        {
                            query = query.Where(x => x.TreePath == treePath);
                        }
                    }
                    break;
                case TreePathGetOperationAxis.Child:
                    query = query.Where(x => x.Parent != null && x.Parent.TreePath == treePath);
                    break;
                case TreePathGetOperationAxis.ChildOrSelf:
                    query = query.Where(x => x.Parent != null && x.Parent.TreePath == treePath || x.TreePath == treePath);
                    break;
            }
        }
        else if (input.Axis == TreePathGetOperationAxis.Child)
        {
            query = query.Where(x => x.Parent == null);
        }

        return query;
    }

    /// <summary>
    /// Применить сортировку.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом сортировки.</returns>
    public static IQueryable<ClientMapperTopicTypeEntity> ApplySorting(
        this IQueryable<ClientMapperTopicTypeEntity> query,
        TopicDomainListGetOperationInput input
        )
    {
        if (input.SortField.Equals(nameof(TopicTypeEntity.Id), StringComparison.OrdinalIgnoreCase))
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
        else if (input.SortField.Equals(nameof(TopicTypeEntity.Name), StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.Name);
            }
            else if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.Name);
            }
        }
        else if (input.SortField.Equals(nameof(TopicDomainEntity.TreePath), StringComparison.OrdinalIgnoreCase))
        {
            if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_ASC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderBy(x => x.TreePath);
            }
            else if (input.SortDirection.Equals(OperationOptions.SORT_DIRECTION_DESC, StringComparison.OrdinalIgnoreCase))
            {
                query = query.OrderByDescending(x => x.TreePath);
            }
        }

        if (!string.IsNullOrWhiteSpace(input.SortField)
            && !input.SortField.Equals(nameof(TopicTypeEntity.Id), StringComparison.OrdinalIgnoreCase)
            && !input.SortField.Equals(nameof(TopicDomainEntity.TreePath), StringComparison.OrdinalIgnoreCase))
        {
            query = ((IOrderedQueryable<ClientMapperTopicTypeEntity>)query).ThenBy(x => x.Id);
        }

        return query;
    }

    #endregion Public methods
}
