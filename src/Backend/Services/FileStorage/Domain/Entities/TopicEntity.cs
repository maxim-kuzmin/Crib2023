// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Entities;

/// <summary>
/// Сущность "Тема".
/// </summary>
public class TopicEntity : Entity<long>, IAggregateRoot
{
    #region Fields

    private readonly List<TopicEntity> _topicChildList = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TopicTypeEntity Data { get; init; }

    /// <summary>
    /// Список дочерних экземпляров сущности "Тема".
    /// </summary>
    public IReadOnlyCollection<TopicEntity> TopicChildList => _topicChildList;

    /// <summary>
    /// Родительский экземпляр сущности "Тема".
    /// </summary>
    public TopicEntity? TopicParent { get; set; }

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
    /// Добавить дочерний экземпляр сущности "Фиктивное дерево".
    /// </summary>
    /// <param name="data">Данные.</param>
    /// <returns>Добавленный экземпляр.</returns>
    public TopicEntity AddDummyChildTree(TopicTypeEntity data)
    {
        var result = _topicChildList.Where(x => x.Data.Name == data.Name).SingleOrDefault();

        if (result is null)
        {
            data.ParentId = GetId();

            result = new TopicEntity(data);

            _topicChildList.Add(result);
        }

        return result;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
