// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Setup;

/// <summary>
/// Параметры настройки.
/// </summary>
public class SetupOptions
{
    #region Properties

    /// <summary>
    /// URL каталога.
    /// </summary>
    public string CatalogUrl { get; set; } = "";

    /// <summary>
    /// URL файлового хранилища.
    /// </summary>
    public string FileStorageUrl { get; set; } = "";

    #endregion Properties
}
