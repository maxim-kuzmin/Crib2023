﻿// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

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
    public ArticleTypeOptions Article { get; protected set; } = null!;

    /// <summary>
    /// Сущность "Тема".
    /// </summary>
    public TopicTypeOptions Topic { get; protected set; } = null!;

    #endregion Properties
}