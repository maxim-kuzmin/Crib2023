// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Gateways.WebAPI.App.Setup;

/// <summary>
/// Параметры настройки.
/// </summary>
public class SetupOptions
{
    #region Properties

    /// <summary>
    /// Признак включения политики CORS.
    /// </summary>
    public bool CorsPolicyIsEnabled { get; set; }

    /// <summary>
    /// Список URL, на которые действует политика CORS.
    /// </summary>
    public string[] CorsPolicyOrigins { get; set; } = Array.Empty<string>();

    #endregion Properties
}
