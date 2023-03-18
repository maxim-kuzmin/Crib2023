// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.Entities;

/// <summary>
/// Базовая сущность "Статья".
/// </summary>
/// <typeparam name="TData">Тип данных.</typeparam>
public class ArticleBaseEntity<TData> : Entity<long>, IAggregateRoot
    where TData : ArticleTypeEntityForList, new()
{
    #region Fields

    private readonly List<OptionValueObject> _topicPathItems = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TData Data { get; }

    /// <summary>
    /// Элементы пути темы.
    /// </summary>
    public IReadOnlyCollection<OptionValueObject> TopicPathItems => _topicPathItems;

    #endregion Properties    

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="data">Данные.</param>
    public ArticleBaseEntity(TData? data = null)
    {
        Data = data ?? new TData();
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить элемент пути темы.
    /// </summary>
    /// <param name="data">Данные.</param>
    /// <returns>Добавленный элемент пути.</returns>
    public OptionValueObject AddTopicPathItem(OptionValueObject data)
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
