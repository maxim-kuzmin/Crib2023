﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Входные данные операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationInput : TreeGetOperationInputWithInt64NodeId
{
    #region Properties

    /// <summary>
    /// Ось.
    /// </summary>
    public TreeGetOperationAxisForList Axis { get; set; }

    /// <summary>
    /// Путь в дереве.
    /// </summary>
    public string TreePath { get; set; } = "";

    #endregion Properties

    #region Public methods

    /// <inheritdoc/>
    public override void Normalize()
    {
        base.Normalize();

        if (string.IsNullOrWhiteSpace(TreePath) || RootNodeId < 1)
        {
            if (Axis == TreeGetOperationAxisForList.ChildOrSelf)
            {
                Axis = TreeGetOperationAxisForList.Child;
            }
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

        if (Axis == TreeGetOperationAxisForList.None)
        {
            Axis = TreeGetOperationAxisForList.All;
        }
    }

    #endregion Public methods
}