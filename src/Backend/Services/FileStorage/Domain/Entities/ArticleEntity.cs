// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Domain.Entities;

/// <summary>
/// Сущность "Статья".
/// </summary>
public class ArticleEntity : Entity<long>, IAggregateRoot
{
    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public ArticleTypeEntity Data { get; init; }

    /// <summary>
    /// Экземпляр сущности "Тема".
    /// </summary>
    public TopicEntity? Topic { get; set; }

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

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}

