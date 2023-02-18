// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Operations.Topic.List.Get;

/// <summary>
/// Входные данные операции получения списка "Тема".
/// </summary>
public class TopicListGetOperationInput : ListGetOperationInput
{
    #region Properties

    /// <summary>
    /// Ось.
    /// </summary>
    public TreePathGetOperationAxis Axis { get; set; }

    /// <summary>
    /// Идентификаторы.
    /// </summary>
    public long[] Ids { get; set; } = Array.Empty<long>();

    /// <summary>
    /// Строка идентификаторов.
    /// </summary>
    public string IdsString { get; set; } = "";

    /// <summary>
    /// Имя.
    /// </summary>
    public string Name { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (string.IsNullOrWhiteSpace(SortField))
        {
            SortField = nameof(TopicTypeEntity.Id);
        }

        if (string.IsNullOrWhiteSpace(SortDirection))
        {
            SortDirection = OperationOptions.SORT_DIRECTION_DESC;
        }

        if (!string.IsNullOrWhiteSpace(IdsString) && !Ids.Any())
        {
            Ids = IdsString.FromStringToNumericInt64Array();
        }
    }

    #endregion Public methods
}
