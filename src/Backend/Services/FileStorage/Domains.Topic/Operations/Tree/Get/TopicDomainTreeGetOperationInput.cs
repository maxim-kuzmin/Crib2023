// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Operations.Tree.Get;

/// <summary>
/// Входные данные операции получения дерева в домене "Тема".
/// </summary>
public class TopicDomainTreeGetOperationInput : TreeGetOperationInputWithInt64NodeId
{
    #region Public methods

    /// <inheritdoc/>
    public override void Normalize()
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
    }

    #endregion Public methods
}
