// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Data.SQL.Setup;

/// <summary>
/// Параметры настройки.
/// </summary>
public class SetupOptions
{
    #region Properties

    /// <summary>
    /// Имя строки подключения.
    /// </summary>
    public string? ConnectionStringName { get; set; }

    #endregion Properties
}
