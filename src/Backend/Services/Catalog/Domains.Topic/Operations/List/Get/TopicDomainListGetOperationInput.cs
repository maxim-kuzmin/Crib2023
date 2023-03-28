// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.List.Get;

/// <summary>
/// Входные данные операции получения списка в домене "Тема".
/// </summary>
public class TopicDomainListGetOperationInput : ListGetOperationInput
{
    #region Properties

    /// <summary>
    /// Ось.
    /// </summary>
    public TreeGetOperationAxisForList Axis { get; set; }

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

    /// <summary>
    /// Путь в дереве.
    /// </summary>
    public string TreePath { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public sealed override void Normalize()
    {
        base.Normalize();

        if (!string.IsNullOrWhiteSpace(IdsString) && !Ids.Any())
        {
            Ids = IdsString.FromStringToNumericInt64Array();
        }

        if (string.IsNullOrWhiteSpace(TreePath))
        {
            if (Ids.Any())
            {
                Axis = TreeGetOperationAxisForList.None;
            }
            else if (Axis == TreeGetOperationAxisForList.ChildOrSelf)
            {
                Axis = TreeGetOperationAxisForList.Child;
            }
            else
            {
                Axis = TreeGetOperationAxisForList.All;
            }            
        }
        else if (Axis == TreeGetOperationAxisForList.None)
        {
            Axis = TreeGetOperationAxisForList.All;
        }

        if (Axis == TreeGetOperationAxisForList.None || Axis == TreeGetOperationAxisForList.Child)
        {
            if (string.IsNullOrWhiteSpace(SortField))
            {
                SortField = nameof(TopicTypeEntity.Id);
            }

            if (string.IsNullOrWhiteSpace(SortDirection))
            {
                SortDirection = OperationOptions.SORT_DIRECTION_DESC;
            }
        }
        else
        {
            if (string.IsNullOrWhiteSpace(SortField))
            {
                SortField = nameof(TopicDomainEntityForItem.TreePath);
            }

            if (string.IsNullOrWhiteSpace(SortDirection))
            {
                SortDirection = OperationOptions.SORT_DIRECTION_ASC;
            }
        }
    }

    #endregion Public methods
}
