// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Article;

/// <summary>
/// Параметры типа "Статья".
/// </summary>
public class ArticleTypeOptions : TypeOptions
{
    #region Properties

    /// <summary>
    /// Колонка в базе данных для поля "ExternalId".
    /// </summary>
    public string? DbColumnForExternalId { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "Hash".
    /// </summary>
    public string? DbColumnForHash { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "Id".
    /// </summary>
    public string? DbColumnForId { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "Path".
    /// </summary>
    public string? DbColumnForPath { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "Title".
    /// </summary>
    public string? DbColumnForTitle { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TopicId".
    /// </summary>
    public string? DbColumnForTopicId { get; set; }

    /// <summary>
    /// Внешний ключ в базе данных к типу "Тема".
    /// </summary>
    public string? DbForeignKeyToTopic { get; set; }

    /// <summary>
    /// Индекс в базе данных для поля "TopicId".
    /// </summary>
    public string? DbIndexForTopicId { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "ExternalId".
    /// </summary>
    public int DbMaxLengthForExternalId { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "Hash".
    /// </summary>
    public int DbMaxLengthForHash { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "Path".
    /// </summary>
    public int DbMaxLengthForPath { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "Title".
    /// </summary>
    public int DbMaxLengthForTitle { get; set; }

    /// <summary>
    /// Первичный ключ в базе данных.
    /// </summary>
    public string? DbPrimaryKey { get; set; }

    /// <summary>
    /// Уникальный индекс в базе данных для поля "ExternalId".
    /// </summary>
    public string? DbUniqueIndexForExternalId { get; set; }

    /// <summary>
    /// Уникальный индекс в базе данных для полей "Title" и "TopicId".
    /// </summary>
    public string? DbUniqueIndexForTitleAndTopicId { get; set; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="topicTypeOptions">Параметры типа "Тема".</param>
    /// <param name="defaults">Значения по умолчанию.</param>
    /// <param name="dbColumnForExternalId">Колонка в базе данных для поля "ExternalId".</param>
    /// <param name="dbColumnForTitle">Колонка в базе данных для поля "Title".</param>    
    /// <param name="dbTable">Таблица в базе данных.</param>
    /// <param name="dbSchema">Схема в базе данных.</param>
    public ArticleTypeOptions(
        TopicTypeOptions topicTypeOptions,
        IDefaults defaults,
        string dbColumnForExternalId,
        string dbColumnForTitle,
        string dbTable,
        string? dbSchema = null
        )
        : base(defaults, dbTable, dbSchema)
    {
        DbColumnForExternalId = dbColumnForExternalId;
        DbColumnForId = defaults.DbColumnForId;
        DbColumnForTitle = dbColumnForTitle;

        if (string.IsNullOrWhiteSpace(topicTypeOptions.DbColumnForId))
        {
            throw new NullOrWhiteSpaceStringVariableException<ArticleTypeOptions>(
                nameof(topicTypeOptions),
                nameof(topicTypeOptions.DbColumnForId));
        }

        DbColumnForTopicId = CreateDbColumnName(topicTypeOptions.DbTable, topicTypeOptions.DbColumnForId);

        DbForeignKeyToTopic = CreateDbForeignKeyName(DbTable, topicTypeOptions.DbTable);
        
        DbIndexForTopicId = CreateDbIndexName(DbTable, DbColumnForTopicId);

        DbMaxLengthForExternalId = 36;
        DbMaxLengthForHash = 256;
        DbMaxLengthForPath = 256;
        DbMaxLengthForTitle = 256;

        DbPrimaryKey = CreateDbPrimaryKeyName(DbTable);

        DbUniqueIndexForExternalId = CreateDbUniqueIndexName(DbTable, DbColumnForExternalId);
        DbUniqueIndexForTitleAndTopicId = CreateDbUniqueIndexName(DbTable, DbColumnForTitle, DbColumnForTopicId);
    }

    #endregion Constructors
}
