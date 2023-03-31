// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Article.Operations.List.Get;

/// <summary>
/// Входные данные операции получения списка в домене "Статья".
/// </summary>
public class ArticleDomainListGetOperationInput : ListGetOperationInput
{
    #region Properties

    /// <summary>
    /// Идентификаторы.
    /// </summary>
    public long[] Ids { get; set; } = Array.Empty<long>();

    /// <summary>
    /// Строка идентификаторов.
    /// </summary>
    public string IdsString { get; set; } = "";

    /// <summary>
    /// Заголовок.
    /// </summary>
    public string Title { get; set; } = "";

    /// <summary>
    /// Идентификатор экземпляра сущности "Тема".
    /// </summary>
    public long TopicId { get; set; }

    /// <summary>
    /// Идентификаторы экземпляров сущности "Тема".
    /// </summary>
    public long[] TopicIds { get; set; } = Array.Empty<long>();

    /// <summary>
    /// Строка идентификаторов экземпляров сущности "Тема".
    /// </summary>
    public string TopicIdsString { get; set; } = "";

    /// <summary>
    /// Имя экземпляра сущности "Тема".
    /// </summary>
    public string TopicName { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (TopicId < 0)
        {
            TopicId = 0;
        }

        if (string.IsNullOrWhiteSpace(SortField))
        {
            SortField = nameof(ArticleTypeEntity.Id);
        }

        if (string.IsNullOrWhiteSpace(SortDirection))
        {
            SortDirection = OperationOptions.SORT_DIRECTION_DESC;
        }

        if (!string.IsNullOrWhiteSpace(IdsString) && !Ids.Any())
        {
            Ids = IdsString.FromStringToNumericInt64Array();
        }

        if (!string.IsNullOrWhiteSpace(TopicIdsString) && !TopicIds.Any())
        {
            TopicIds = TopicIdsString.FromStringToNumericInt64Array();
        }
    }

    #endregion Public methods
}
