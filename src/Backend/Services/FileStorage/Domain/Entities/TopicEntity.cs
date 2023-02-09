// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Entities;

/// <summary>
/// Сущность "Тема".
/// </summary>
public class TopicEntity : Entity<long>, IAggregateRoot
{
    #region Fields

    private readonly List<TopicTypeEntity> _children = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TopicTypeEntity Data { get; init; }

    /// <summary>
    /// Дети.
    /// </summary>
    public IReadOnlyCollection<TopicTypeEntity> Children => _children;

    /// <summary>
    /// Родитель.
    /// </summary>
    public TopicTypeEntity? Parent { get; set; }

    #endregion Properties    

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="data">Данные.</param>
    public TopicEntity(TopicTypeEntity data)
    {
        Data = data;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить ребёнка.
    /// </summary>
    /// <param name="data">Данные.</param>
    /// <returns>Добавленный добавленный.</returns>
    public TopicTypeEntity AddChild(TopicTypeEntity data)
    {
        var result = _children.Where(x => x.Name == data.Name).SingleOrDefault();

        if (result is null)
        {
            data.ParentId = GetId();

            _children.Add(data);
        }

        return result ?? data;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
