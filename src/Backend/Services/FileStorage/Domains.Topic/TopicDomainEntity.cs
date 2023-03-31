// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Topic;

/// <summary>
/// Сущность домена "Тема".
/// </summary>
public class TopicDomainEntity : Entity<long>, IAggregateRoot
{
    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TopicTypeEntity Data { get; }

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

    /// <summary>
    /// Путь в дереве.
    /// </summary>
    public string TreePath { get; }

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
    public TopicDomainEntity(
        TopicTypeEntity? data = null,
        bool treeHasChildren = false,
        bool treeIsExpanded = false,
        int treeLevel = 0,
        string treePath = "")
    {
        Data = data ?? new TopicTypeEntity();
        TreeHasChildren = treeHasChildren;
        TreeIsExpanded = treeIsExpanded;
        TreeLevel = treeLevel;
        TreePath = treePath;
    }

    #endregion Constructors

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
