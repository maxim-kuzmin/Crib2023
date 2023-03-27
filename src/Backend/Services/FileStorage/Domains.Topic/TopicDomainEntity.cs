// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

using Makc2023.Backend.Common.Domain.ValueObjects.Options;

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Сущность домена "Тема".
/// </summary>
public class TopicDomainEntity : Entity<long>, IAggregateRoot
{
    #region Fields

    private readonly List<OptionValueObjectWithInt64Id> _treeAncestors = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TopicTypeEntity Data { get; }

    /// <summary>
    /// Предки в дереве.
    /// </summary>
    public IReadOnlyCollection<OptionValueObjectWithInt64Id> TreeAncestors => _treeAncestors;

    /// <summary>
    /// Признак наличия детей в дереве.
    /// </summary>
    public bool TreeHasChildren { get; }

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
    /// <param name="treeLevel">Уровень в дереве.</param>
    /// <param name="treePath">Путь в дереве.</param>
    public TopicDomainEntity(
        TopicTypeEntity? data = null,
        bool treeHasChildren = false,
        int treeLevel = 0,
        string treePath = "")
    {
        Data = data ?? new TopicTypeEntity();
        TreeHasChildren = treeHasChildren;
        TreeLevel = treeLevel;
        TreePath = treePath;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить предка в дереве.
    /// </summary>
    /// <param name="data">Данные.</param>
    /// <returns>Добавленный предок.</returns>
    public OptionValueObjectWithInt64Id AddTreeAncestor(OptionValueObjectWithInt64Id data)
    {
        var result = _treeAncestors.Where(x => x.Id == data.Id).SingleOrDefault();

        if (result is null)
        {
            _treeAncestors.Add(data);
        }

        return result ?? data;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
