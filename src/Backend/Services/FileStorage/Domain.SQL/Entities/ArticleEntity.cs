// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.SQL.Entities;

/// <summary>
/// Сущность "Статья".
/// </summary>
public class ArticleEntity : Entity<long>, IAggregateRoot
{
    #region Fields

    private readonly List<TopicTypeEntity> _path = new();

    #endregion Fields

    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public ArticleTypeEntity Data { get; init; }

    /// <summary>
    /// Путь.
    /// </summary>
    public IReadOnlyCollection<TopicTypeEntity> Path => _path;

    #endregion Properties    

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="data">Данные.</param>
    public ArticleEntity(ArticleTypeEntity data)
    {
        Data = data;
    }

    #endregion Constructors

    #region Public methods

    /// <summary>
    /// Добавить тему в путь.
    /// </summary>
    /// <param name="data">Данные.</param>
    /// <returns>Добавленная тема.</returns>
    public TopicTypeEntity AddTopicToPath(TopicTypeEntity data)
    {
        var result = _path.Where(x => x.Id == data.Id).SingleOrDefault();

        if (result is null)
        {
            _path.Add(data);
        }

        return result ?? data;
    }

    #endregion Public methods

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}

