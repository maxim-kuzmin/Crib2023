// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Topic;

/// <summary>
/// Сущность типа "Тема" сопоставителя клиента.
/// </summary>
public class ClientMapperTopicTypeEntity : TopicTypeEntity
{
    #region Properties

    /// <summary>
    /// Колонка в базе данных для поля "TreePath".
    /// </summary>
    public LTree DbColumnForTreePath { get; set; }

    #endregion Properties

    #region Navigation properties

    /// <summary>
    /// Список экземпляров сущности "Статья".
    /// </summary>
    public List<ClientMapperArticleTypeEntity> ArticleList { get; } = new();

    /// <summary>
    /// Дети.
    /// </summary>
    public List<ClientMapperTopicTypeEntity> Children { get; } = new();

    /// <summary>
    /// Родитель.
    /// </summary>
    public ClientMapperTopicTypeEntity? Parent { get; set; }

    #endregion Navigation properties

    #region Public methods

    /// <summary>
    /// Построить.
    /// </summary>
    /// <returns>Результат построения.</returns>
    public ClientMapperTopicTypeEntity Build()
    {
        TreePath = DbColumnForTreePath;

        return this;
    }

    #endregion Public methods
}
