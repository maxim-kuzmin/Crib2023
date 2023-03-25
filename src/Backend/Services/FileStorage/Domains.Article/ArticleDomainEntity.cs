// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domains.Article;

/// <summary>
/// Сущность "Статья".
/// </summary>
public class ArticleDomainEntity : Entity<long>, IAggregateRoot
{
    #region Fields

    private readonly List<OptionWithInt64IdValueObject> _topicPathItems = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public ArticleTypeEntity Data { get; }

    /// <summary>
    /// Элементы пути темы.
    /// </summary>
    public IReadOnlyCollection<OptionWithInt64IdValueObject> TopicPathItems => _topicPathItems;

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
    /// <param name="data">Данные.</param>
    /// <returns>Добавленный элемент пути.</returns>
    public OptionWithInt64IdValueObject AddTopicPathItem(OptionWithInt64IdValueObject data)
    {
        var result = _topicPathItems.Where(x => x.Id == data.Id).SingleOrDefault();

        if (result is null)
        {
            _topicPathItems.Add(data);
        }

        return result ?? data;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}

