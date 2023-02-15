// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL.Types.Topic;

/// <summary>
/// Параметры типа "Тема".
/// </summary>
public class TopicTypeOptions : TypeOptions
{
    #region Properties

    /// <summary>
    /// Колонка в базе данных для поля "ExternalId".
    /// </summary>
    public string? DbColumnForExternalId { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "Id".
    /// </summary>
    public string? DbColumnForId { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "Name".
    /// </summary>
    public string? DbColumnForName { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "ParentId".
    /// </summary>
    public string? DbColumnForParentId { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TreeChildCount".
    /// </summary>
    public string? DbColumnForTreeChildCount { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TreeDescendantCount".
    /// </summary>
    public string? DbColumnForTreeDescendantCount { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TreeLevel".
    /// </summary>
    public string? DbColumnForTreeLevel { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TreePath".
    /// </summary>
    public string? DbColumnForTreePath { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TreePosition".
    /// </summary>
    public string? DbColumnForTreePosition { get; set; }

    /// <summary>
    /// Колонка в базе данных для поля "TreeSort".
    /// </summary>
    public string? DbColumnForTreeSort { get; set; }

    /// <summary>
    /// Внешний ключ в базе данных к родительскому типу "Тема".
    /// </summary>
    public string? DbForeignKeyToTopicParent { get; set; }

    /// <summary>
    /// Индекс в базе данных для поля "ParentId".
    /// </summary>
    public string? DbIndexForParentId { get; set; }

    /// <summary>
    /// Индекс в базе данных для поля "TreePath".
    /// </summary>
    public string? DbIndexForTreePath { get; set; }

    /// <summary>
    /// Индекс в базе данных для поля "TreeSort".
    /// </summary>
    public string? DbIndexForTreeSort { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "ExternalId".
    /// </summary>
    public int DbMaxLengthForExternalId { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "Name".
    /// </summary>
    public int DbMaxLengthForName { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "TreePath".
    /// </summary>
    public int DbMaxLengthForTreePath { get; set; }

    /// <summary>
    /// Максимальная длина в базе данных для поля "TreeSort".
    /// </summary>
    public int DbMaxLengthForTreeSort { get; set; }

    /// <summary>
    /// Первичный ключ в базе данных.
    /// </summary>
    public string? DbPrimaryKey { get; set; }

    /// <summary>
    /// Последовательность в базеданных для поля "Id".
    /// </summary>
    public string DbSequenceForId { get; set; }

    /// <summary>
    /// Уникальный индекс в базе данных для поля "ExternalId".
    /// </summary>
    public string? DbUniqueIndexForExternalId { get; set; }

    /// <summary>
    /// Уникальный индекс в базе данных для полей "Name" и "ParentId".
    /// </summary>
    public string? DbUniqueIndexForNameAndParentId { get; set; }

    #endregion Properties

    #region Constructors

    /// <summary>
    /// Конструктор.
    /// </summary>
    /// <param name="defaults">Значения по умолчанию.</param>
    /// <param name="dbColumnForExternalId">Колонка в базе данных для поля "ExternalId".</param>
    /// <param name="dbTable">Таблица в базе данных.</param>
    /// <param name="dbSchema">Схема в базе данных.</param>
    public TopicTypeOptions(
        IDefaults defaults,
        string dbColumnForExternalId,
        string dbTable,
        string? dbSchema = null
        )
        : base(defaults, dbTable, dbSchema)
    {
        DbColumnForExternalId = dbColumnForExternalId;
        DbColumnForId = defaults.DbColumnForId;
        DbColumnForName = defaults.DbColumnForName;
        DbColumnForParentId = defaults.DbColumnForParentId;
        DbColumnForTreeChildCount = defaults.DbColumnForTreeChildCount;
        DbColumnForTreeDescendantCount = defaults.DbColumnForTreeDescendantCount;
        DbColumnForTreeLevel = defaults.DbColumnForTreeLevel;
        DbColumnForTreePath = defaults.DbColumnForTreePath;
        DbColumnForTreePosition = defaults.DbColumnForTreePosition;
        DbColumnForTreeSort = defaults.DbColumnForTreeSort;

        DbForeignKeyToTopicParent = CreateDbForeignKeyName(DbTable, DbTable, DbColumnForParentId);
        
        DbIndexForParentId = CreateDbIndexName(DbTable, DbColumnForParentId);
        DbIndexForTreePath = CreateDbIndexName(DbTable, DbColumnForTreePath);
        DbIndexForTreeSort = CreateDbIndexName(DbTable, DbColumnForTreeSort);

        DbMaxLengthForExternalId = 36;
        DbMaxLengthForName = 256;
        DbMaxLengthForTreePath = 900;
        DbMaxLengthForTreeSort = 900;

        DbPrimaryKey = CreateDbPrimaryKeyName(DbTable);

        DbSequenceForId = CreateDbSequenceName(DbTable, DbColumnForId);

        DbUniqueIndexForExternalId = CreateDbUniqueIndexName(DbTable, DbColumnForExternalId);
        DbUniqueIndexForNameAndParentId = CreateDbUniqueIndexName(DbTable, DbColumnForName, DbColumnForParentId);
    }

    #endregion Constructors
}
