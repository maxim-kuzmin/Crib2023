﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Сущность домена "Статья".
/// </summary>
public class ArticleDomainEntity : Entity<long>, IAggregateRoot
{
    #region Fields

    private readonly List<OptionValueObjectWithInt64Id> _topicPathItems = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public ArticleTypeEntity Data { get; }

    /// <summary>
    /// Элементы пути темы.
    /// </summary>
    public IReadOnlyCollection<OptionValueObjectWithInt64Id> TopicPathItems => _topicPathItems;

    #endregion Properties    

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="data">Данные.</param>
    public ArticleDomainEntity(ArticleTypeEntity? data = null)
    {
        Data = data ?? new ArticleTypeEntity();
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить элемент пути темы.
    /// </summary>
    /// <param name="pathItem">Элемент пути.</param>
    /// <returns>Добавленный элемент пути.</returns>
    public OptionValueObjectWithInt64Id AddTopicPathItem(OptionValueObjectWithInt64Id pathItem)
    {
        var result = _topicPathItems.Where(x => x.Id == pathItem.Id).SingleOrDefault();

        if (result is null)
        {
            _topicPathItems.Add(pathItem);
        }

        return result ?? pathItem;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}

