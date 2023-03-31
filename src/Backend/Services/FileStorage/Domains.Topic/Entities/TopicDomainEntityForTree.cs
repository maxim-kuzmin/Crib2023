// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Entities;

/// <summary>
/// Сущность для дерева домена "Тема".
/// </summary>
public class TopicDomainEntityForTree : TopicDomainEntity, IAggregateRoot
{
    #region Fields

    private readonly List<TopicDomainEntityForTree> _treeChildren = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Дети в дереве.
    /// </summary>
    public IReadOnlyCollection<TopicDomainEntityForTree> TreeChildren => _treeChildren;

    #endregion Properties    

    #region Constructors

    /// <inheritdoc/>
    public TopicDomainEntityForTree(
        TopicTypeEntity? data = null,
        bool treeHasChildren = false,
        bool treeIsExpanded = false,
        int treeLevel = 0,
        string treePath = "")
        : base(
            data: data,
            treeHasChildren: treeHasChildren,
            treeIsExpanded: treeIsExpanded,
            treeLevel: treeLevel,
            treePath: treePath)
    {
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить ребёнка в дереве.
    /// </summary>
    /// <param name="child">Ребёнок.</param>
    /// <returns>Добавленный ребёнок.</returns>
    public TopicDomainEntityForTree AddTreeChild(TopicDomainEntityForTree child)
    {
        var result = _treeChildren.Where(x => x.Data.Id == child.Data.Id).SingleOrDefault();

        if (result is null)
        {
            _treeChildren.Add(child);
        }

        return result ?? child;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
