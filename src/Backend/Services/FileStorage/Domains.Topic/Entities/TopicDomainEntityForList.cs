// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic.Entities;

/// <summary>
/// Сущность для списка домена "Тема".
/// </summary>
public class TopicDomainEntityForList : TopicDomainEntity, IAggregateRoot
{
    #region Fields

    private readonly List<OptionValueObjectWithInt64Id> _treeAncestors = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Предки в дереве.
    /// </summary>
    public IReadOnlyCollection<OptionValueObjectWithInt64Id> TreeAncestors => _treeAncestors;

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
    public TopicDomainEntityForList(
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
    /// Добавить предка в дереве.
    /// </summary>
    /// <param name="ancestor">Предок.</param>
    /// <returns>Добавленный предок.</returns>
    public OptionValueObjectWithInt64Id AddTreeAncestor(OptionValueObjectWithInt64Id ancestor)
    {
        var result = _treeAncestors.Where(x => x.Id == ancestor.Id).SingleOrDefault();

        if (result is null)
        {
            _treeAncestors.Add(ancestor);
        }

        return result ?? ancestor;
    }

    #endregion Public methods
}
