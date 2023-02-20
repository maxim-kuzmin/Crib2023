// Copyright (c) 2023 Maxim Kuzmin. All rights reserved. Licensed under the MIT License.

namespace Crib2023.Backend.Services.Catalog.Domain.SQL.ValueObjects;

/// <summary>
/// Объект-значение параметра.
/// </summary>
public class OptionValueObject : OptionWithInt64IdValueObject
{
    #region Constructors

    /// <inheritdoc/>
    public OptionValueObject(long id, string name)
        : base(id, name)
    {
    }

    #endregion Constructors
}
