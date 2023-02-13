// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.FileStorage.Data.SQL;

/// <summary>
/// Параметры типов.
/// </summary>
public abstract class TypesOptions
{
    #region Properties

    /// <summary>
    /// Сущность "Статья".
    /// </summary>
    public ArticleTypeOptions Article { get; init; } = null!;

    /// <summary>
    /// Сущность "Тема".
    /// </summary>
    public TopicTypeOptions Topic { get; init; } = null!;

    #endregion Properties
}
