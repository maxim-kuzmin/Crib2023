// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domains.Topic;

/// <summary>
/// Сущность домена "Тема".
/// </summary>
public class TopicDomainEntity : Entity<long>, IAggregateRoot
{
    #region Properties

    /// <summary>
    /// Данные.
    /// </summary>
    public TopicTypeEntity Data { get; }

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
    /// <param name="treePath">Путь в дереве.</param>
    public TopicDomainEntity(
        TopicTypeEntity? data = null,        
        string treePath = "")
    {
        Data = data ?? new TopicTypeEntity();
        TreePath = treePath;
    }

    #endregion Constructors

    #region Protected methods

    /// <inheritdoc/>
    protected override long GetId() => Data.Id;

    #endregion Protected methods
}
