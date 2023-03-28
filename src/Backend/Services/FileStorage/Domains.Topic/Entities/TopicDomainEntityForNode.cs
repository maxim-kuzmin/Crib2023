// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Entities;

/// <summary>
/// Сущность для узла домена "Тема".
/// </summary>
public class TopicDomainEntityForNode : TopicDomainEntity, IAggregateRoot
{
    #region Fields

    private readonly List<TopicDomainEntityForNode> _treeChildren = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Дети в дереве.
    /// </summary>
    public IReadOnlyCollection<TopicDomainEntityForNode> TreeChildren => _treeChildren;

    #endregion Properties    

    #region Constructors

    /// <inheritdoc/>
    public TopicDomainEntityForNode(
        TopicTypeEntity? data = null,
        bool treeHasChildren = false,
        int treeLevel = 0,
        string treePath = "")
        : base(data, treeHasChildren, treeLevel, treePath)
    {
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить ребёнка в дереве.
    /// </summary>
    /// <param name="child">Ребёнок.</param>
    /// <returns>Добавленный ребёнок.</returns>
    public TopicDomainEntityForNode AddTreeChild(TopicDomainEntityForNode child)
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
