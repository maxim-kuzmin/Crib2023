// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Operations.Article.List.Get;

/// <summary>
/// Входные данные операции получения списка "Статья".
/// </summary>
public class ArticleListGetOperationInput : ListGetOperationInput
{
    #region Properties

    /// <summary>
    /// Идентификаторы.
    /// </summary>
    public long[]? Ids { get; set; }

    /// <summary>
    /// Строка идентификаторов.
    /// </summary>
    public string? IdsString { get; set; }

    /// <summary>
    /// Имя.
    /// </summary>
    public string? Name { get; set; }

    /// <summary>
    /// Идентификатор экземпляра сущности "Фиктивное отношение один ко многим".
    /// </summary>
    public long TopicId { get; set; }

    /// <summary>
    /// Идентификаторы экземпляров сущности "Фиктивное отношение один ко многим".
    /// </summary>
    public long[]? TopicIds { get; set; }

    /// <summary>
    /// Строка идентификаторов экземпляров сущности "Фиктивное отношение один ко многим".
    /// </summary>
    public string? TopicIdsString { get; set; }

    /// <summary>
    /// Имя экземпляра сущности "Фиктивное отношение один ко многим".
    /// </summary>
    public string? TopicName { get; set; }

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (string.IsNullOrWhiteSpace(SortField))
        {
            SortField = nameof(ArticleTypeEntity.Id);
        }

        if (string.IsNullOrWhiteSpace(SortDirection))
        {
            SortDirection = OperationOptions.SORT_DIRECTION_DESC;
        }

        if (!string.IsNullOrWhiteSpace(IdsString) && (Ids == null || !Ids.Any()))
        {
            Ids = IdsString.FromStringToNumericInt64Array();
        }

        if (!string.IsNullOrWhiteSpace(TopicIdsString)
            &&
            (
                TopicIds == null
                ||
                !TopicIds.Any()
            ))
        {
            TopicIds = TopicIdsString.FromStringToNumericInt64Array();
        }
    }

    #endregion Public methods
}
