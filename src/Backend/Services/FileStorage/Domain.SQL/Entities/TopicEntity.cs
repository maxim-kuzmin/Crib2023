// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Entities;

/// <summary>
/// Сущность "Тема".
/// </summary>
public class TopicEntity : Entity<long>, IAggregateRoot
{
    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TopicTypeEntity Data { get; }

    /// <summary>
    /// Признак наличия детей в дереве.
    /// </summary>
    public bool TreeHasChildren { get; private set; }

    /// <summary>
    /// Уровень в дереве.
    /// </summary>
    public int TreeLevel { get; private set; }

    /// <summary>
    /// Путь в дереве.
    /// </summary>
    public string TreePath { get; private set; } = "";

    #endregion Properties    

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="data">Данные.</param>
    public TopicEntity(TopicTypeEntity? data = null)
    {
        Data = data ?? new TopicTypeEntity();
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Загрузить дерево.
    /// </summary>
    /// <param name="treeHasChildren">Признак наличия детей в дереве.</param>
    /// <param name="treeLevel">Уровень в дереве.</param>
    /// <param name="treePath">Путь в дереве.</param>
    public void LoadTree(bool treeHasChildren, int treeLevel, string treePath)
    {
        TreeHasChildren = treeHasChildren;
        TreeLevel = treeLevel;
        TreePath = treePath;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
