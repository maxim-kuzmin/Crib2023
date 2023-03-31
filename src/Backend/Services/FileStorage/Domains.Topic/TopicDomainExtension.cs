// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic;

/// <summary>
/// Расширение домена "Тема".
/// </summary>
public static class TopicDomainExtension
{
    #region Public methods

    /// <summary>
    /// Преобразовать к предикату для раскрытого пути.
    /// </summary>
    /// <param name="ids">Идентификаторы узлов раскрытого пути.</param>
    /// <returns>Предикат.</returns>
    public static ExpressionStarter<ClientMapperTopicTypeEntity> ToPredicateForExpandedPath(this long[] ids)
    {
        var result = PredicateBuilder.New<ClientMapperTopicTypeEntity>(true);

        result.And(x => x.ParentId.HasValue && ids.Contains(x.ParentId.Value) || ids.Contains(x.Id));

        return result;
    }

    /// <summary>
    /// Применить сортировку.
    /// </summary>
    /// <param name="query">Запрос.</param>
    /// <param name="input">Входные данные.</param>
    /// <returns>Запрос с учётом сортировки.</returns>
    public static IQueryable<ClientMapperTopicTypeEntity> ApplySorting(
        this IQueryable<ClientMapperTopicTypeEntity> query,
        TopicDomainTreeGetOperationInput input)
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
        else if (input.SortField.Equals(nameof(TopicDomainEntityForItem.TreePath), StringComparison.OrdinalIgnoreCase))
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
            && !input.SortField.Equals(nameof(TopicDomainEntityForItem.TreePath), StringComparison.OrdinalIgnoreCase))
        {
            query = ((IOrderedQueryable<ClientMapperTopicTypeEntity>)query).ThenBy(x => x.Id);
        }

        return query;
    }

    #endregion Public methods
}
