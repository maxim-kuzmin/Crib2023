// Copyright (c) 2022 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Mappers.EF.Clients.PostgreSQL.Types.Article;

/// <summary>
/// Сущность типа "Статья" сопоставителя клиента.
/// </summary>
public class ClientMapperArticleTypeEntity : ArticleTypeEntity
{
    #region Navigation properties

    /// <summary>
    /// Экземпляр сущности "Тема".
    /// </summary>
    public ClientMapperTopicTypeEntity? Topic { get; set; }

    #endregion Navigation properties
}
