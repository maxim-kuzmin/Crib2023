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

    /// <summary>
    /// Признак наличия детей в дереве.
    /// </summary>
    public bool TreeHasChildren { get; }

    /// <summary>
    /// Признак раскрытого узла дерева.
    /// </summary>
    public bool TreeIsExpanded { get; }

    /// <summary>
    /// Уровень в дереве.
    /// </summary>
    public int TreeLevel { get; }

    #endregion Properties    

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="data">Данные.</param>    
    /// <param name="treeHasChildren">Признак наличия детей в дереве.</param>
    /// <param name="treeIsExpanded">Признак раскрытого узла дерева.</param>
    /// <param name="treeLevel">Уровень в дереве.</param>
    /// <param name="treePath">Путь в дереве.</param>
    public TopicDomainEntityForTree(
        TopicTypeEntity? data = null,
        bool treeHasChildren = false,
        bool treeIsExpanded = false,
        int treeLevel = 0,
        string treePath = "")
        : base(data: data, treePath: treePath)
    {
        TreeHasChildren = treeHasChildren;
        TreeIsExpanded = treeIsExpanded;
        TreeLevel = treeLevel;
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
