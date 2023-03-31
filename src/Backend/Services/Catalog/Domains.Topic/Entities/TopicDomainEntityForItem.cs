// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic.Entities;

/// <summary>
/// Сущность для элемента домена "Тема".
/// </summary>
public class TopicDomainEntityForItem : TopicDomainEntity, IAggregateRoot
{
    #region Fields

    private readonly List<OptionValueObjectWithInt64Id> _treeAncestors = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Предки в дереве.
    /// </summary>
    public IReadOnlyCollection<OptionValueObjectWithInt64Id> TreeAncestors => _treeAncestors;

    #endregion Properties    

    #region Constructors

    /// <inheritdoc/>
    public TopicDomainEntityForItem(TopicTypeEntity? data = null, string treePath = "")
        : base(data: data, treePath: treePath)
    {
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
