// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Operations.Tree.Get;

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

        if (Axis == TreeGetOperationAxisForList.Child || Axis == TreeGetOperationAxisForList.None)
        {
            if (string.IsNullOrWhiteSpace(SortField))
            {
                SortField = nameof(TopicTypeEntity.Id);
            }

            if (string.IsNullOrWhiteSpace(SortDirection))
            {
                SortDirection = OperationSortDirection.DESC;
            }
        }
        else
        {
            SortField = nameof(ClientMapperTopicTypeEntity.TreePath);

            SortDirection = OperationSortDirection.ASC;
        }
    }

    /// <summary>
    /// Создать предикат.
    /// </summary>
    /// <returns>Предикат.</returns>
    public virtual ExpressionStarter<ClientMapperTopicTypeEntity> CreatePredicate()
    {
        var result = PredicateBuilder.New<ClientMapperTopicTypeEntity>(true);

        if (!string.IsNullOrWhiteSpace(RootNodeTreePath))
        {
            var treePath = new LTree(RootNodeTreePath);

            switch (Axis)
            {
                case TreeGetOperationAxisForList.Ancestor:
                    result = result.And(x => x.TreePath.IsAncestorOf(treePath));
                    break;
                case TreeGetOperationAxisForList.AncestorOrSelf:
                    result = result.And(x => x.TreePath.IsAncestorOf(treePath) || x.TreePath == treePath);
                    break;
                case TreeGetOperationAxisForList.Descendant:
                    result = result.And(x => x.TreePath.IsDescendantOf(treePath));
                    break;
                case TreeGetOperationAxisForList.DescendantOrSelf:
                    result = result.And(x => x.TreePath.IsDescendantOf(treePath) || x.TreePath == treePath);
                    break;
                case TreeGetOperationAxisForList.ParentOrSelf:
                    {
                        string parentTreePathString = RootNodeTreePath.FromTreePathToParentTreePath();

                        LTree? parentTreePath = null;

                        if (!string.IsNullOrWhiteSpace(parentTreePathString))
                        {
                            parentTreePath = new LTree(parentTreePathString);
                        }

                        result = parentTreePath != null
                            ? result.And(x => x.TreePath == parentTreePath || x.TreePath == treePath)
                            : result.And(x => x.TreePath == treePath);
                    }
                    break;
                case TreeGetOperationAxisForList.Child:
                    result = result.And(x => x.Parent != null && x.Parent.TreePath == treePath);
                    break;
                case TreeGetOperationAxisForList.ChildOrSelf:
                    result = result.And(x => x.Parent != null && x.Parent.TreePath == treePath || x.TreePath == treePath);
                    break;
            }
        }
        else if (Axis == TreeGetOperationAxisForList.Child)
        {
            result = RootNodeId > 0
                ? result.And(x => x.ParentId == RootNodeId)
                : result.And(x => x.Parent == null);
        }

        return result;
    }

    #endregion Public methods
}
